import styled from "styled-components";
import { useEffect, useState } from "react";

interface ToggleProps {
  type: string;
}

const AgreementToggle = (props: ToggleProps) => {
  const { type } = props;
  const [isOn, setisOn] = useState(false);

  //localstorage 에서 각각이 동의 되어있는지 확인하여 토글 여부로 따지기

  /*
  localStorage.setItem("agreePrivacyPolicy", "true");
    localStorage.setItem("agreeTermsOfUse", "true");
  */
  // 동의 여부에 따라 기본 세팅값
  useEffect(() => {
    const agreeState = localStorage.getItem(type);
    if (agreeState) {
      setisOn(true);
    } else {
      setisOn(false);
    }
  }, []);

  const toggleHandler = () => {
    // isOn의 상태를 변경하는 메소드를 구현
    setisOn(!isOn);
    if (isOn) {
      localStorage.removeItem(type);
    } else {
      localStorage.setItem(type, "true");
    }
  };
  return (
    <>
      <ToggleContainer
        // 클릭하면 토글이 켜진 상태(isOn)를 boolean 타입으로 변경하는 메소드가 실행
        onClick={toggleHandler}
      >
        {/* 아래에 div 엘리먼트 2개가 있다. 각각의 클래스를 'toggle-container', 'toggle-circle' 로 지정 */}
        {/* Toggle Switch가 ON인 상태일 경우에만 toggle--checked 클래스를 div 엘리먼트 2개에 모두 추가. 조건부 스타일링을 활용*/}
        <div className={`toggle-container ${isOn ? "toggle--checked" : null}`} />
        <div className={`toggle-circle ${isOn ? "toggle--checked" : null}`} />
      </ToggleContainer>
      {/* Desc 컴포넌트를 활용*/}
      {/* Toggle Switch가 ON인 상태일 경우에 Desc 컴포넌트 내부의 텍스트를 'Toggle Switch ON'으로, 그렇지 않은 경우 'Toggle Switch OFF'. 조건부 렌더링을 활용. */}
    </>
  );
};

export default AgreementToggle;

const ToggleContainer = styled.div`
  position: absolute;
  right: 2rem;
  cursor: pointer;
  > .toggle-container {
    width: 36px;
    height: 20px;
    border-radius: 30px;
    background-color: #d2d5da;
  }
  > .toggle--checked {
    background-color: #1f53ff;
    transition: 0.3s;
  }

  > .toggle-circle {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 17px;
    height: 16px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: 0.3s;
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  }
  > .toggle--checked {
    left: 16.5px;
    transition: 0.3s;
  }
`;
