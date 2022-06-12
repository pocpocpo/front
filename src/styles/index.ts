import styled from 'styled-components';

export const ContainerCenter = styled.div`
  display: flex;
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
  justify-content: space-around;

  h1 {
    color: #fff;
  }

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;
