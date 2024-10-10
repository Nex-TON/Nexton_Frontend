import { Address, 
    beginCell, 
    Cell, 
    Contract, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    SendMode
 } from '@ton/core';


export const NFT_ITEM_CONTRACT_CODE = "b5ee9c72010213010002ef000114ff00f4a413f4bcf2c80b0102016202030202cd0405020120111202012006070025d0264659fa801e78b00e78b6600e78b64f6aa404f743221c700925f03e0d0d3030171b0925f03e0fa40fa4031fa003171d721fa0031fa003073a9b400f00305b38e165b6c22345232c705f2e19501fa40d4fa40301034f004e007d31fd33f82105fcc3d145230ba8e8c32104810371026104502db3ce082102fcb26a25230bae30282101c04412a5230bae30231363737808090a0b0201200f1001f65136c705f2e191fa4021f002fa40d20031fa00820afaf0801ca121945315a0a1de22d70b01c300209206a19136e220c2fff2e192218e3e821005138d91c8500acf16500ccf1671244a145446b0708010c8cb055007cf165005fa0215cb6a12cb1fcb3f226eb39458cf17019132e201c901fb00105894102b385be20c0080135f03333334347082108b77173504c8cbff58cf164430128040708010c8cb055007cf165005fa0215cb6a12cb1fcb3f226eb39458cf17019132e201c901fb00011832104810371026104502db3c0d003c82101a0b9d5116ba9e5131c705f2e19a01d4304400f004e05f06840ff2f00082028e3527f0028210d53276db103845006d71708010c8cb055007cf165005fa0215cb6a12cb1fcb3f226eb39458cf17019132e201c901fb0093303335e25503f00401f65134c705f2e191fa4021f002fa40d20031fa00820afaf0801ca121945315a0a1de22d70b01c300209206a19136e220c2fff2e192218e3e8210511a4463c85008cf16500ccf1671244814544690708010c8cb055007cf165005fa0215cb6a12cb1fcb3f226eb39458cf17019132e201c901fb00103894102b365be20e0082028e3527f0028210d53276db103848006d71708010c8cb055007cf165005fa0215cb6a12cb1fcb3f226eb39458cf17019132e201c901fb0093303630e25503f00400113e910c1c2ebcb8536000413b513434cffe900835d27080271fc07e90353e900c040d440d380c1c165b5b5b60000dbf03a7801b628c000bbc7e7f801984";

export const NFT_ITEM_CONTRACT_CODE_CELL = Cell.fromBoc(Buffer.from(NFT_ITEM_CONTRACT_CODE, 'hex'))[0];

export type NftItemConfig = {
    index: number;
    collectionAddress: Address;
    ownerAddress: Address;
    nextonAddress: Address;
    itemContent: Cell;
};

export function nftItemConfigToCell(config: NftItemConfig): Cell {
    return beginCell()
        .storeUint(config.index, 64)
        .storeAddress(config.collectionAddress)
        .storeAddress(config.ownerAddress)
        .storeAddress(config.nextonAddress)
        .storeRef(config.itemContent)
    .endCell();
}

export class NftItem implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new NftItem(address);
    }

    static createFromConfig(config: NftItemConfig, code: Cell, workchain = 0) {
        const data = nftItemConfigToCell(config);
        const init = { code, data };
        return new NftItem(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendTransfer(provider: ContractProvider, via: Sender,
        opts: {
            queryId: number;
            value: bigint;
            newOwner: Address;
            responseAddress?: Address;
            fwdAmount?: bigint;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0x5fcc3d14, 32)
                .storeUint(opts.queryId,64)
                .storeAddress(opts.newOwner)
                .storeAddress(opts.responseAddress || null)
                .storeBit(false) // no custom payload
                .storeCoins(opts.fwdAmount || 0)
                .storeBit(false)
            .endCell(),
        });
    }

    async getItemData(provider: ContractProvider){
        const res = await provider.get("get_nft_data",[]);
        res.stack.readBigNumberOpt();
        return {
            index: res.stack.readBigNumber(),
            collectionAddress: res.stack.readAddress(),
            itemOwner: res.stack.readAddress(),
            itemContent: res.stack.readCell()
        };
    }
}
