import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background: #d0d3da;

  padding: 16px 32px 16px 32px;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;

  max-width: 1120px;

  margin: 0 auto;
`;

export const Logo = styled.img`
  height: auto;
  width: 100%;
  max-width: 235px;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  margin-left: auto;

  img {
    width: 56px;
    height: 56px;

    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;

    margin-left: 16px;

    line-height: 24px;

    strong {
      color: #2ab455;
    }
  }
`;

export const LogOutButton = styled.button`
  margin-left: 15px;
  border: transparent;
  background-color: transparent;
  &:hover {
    color: red;
  }
`;
