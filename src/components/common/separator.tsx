import styled from '@emotion/styled';

const Separator = styled.hr(({ theme }) => ({
  width: '100%',
  borderColor: theme.colors.secondary,
  marginBlock: '0.25em',
}));

export default Separator;
