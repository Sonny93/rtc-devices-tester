import styled from '@emotion/styled';
import CamerasSelector from '~/components/selectors/cameras_selector';
import MicrophonesSelector from '~/components/selectors/microphones_selector';
import SpeakersSelector from '~/components/selectors/speakers_selector';

const Wrapper = styled.section(({ theme }) => ({
  height: 'fit-content',
  backgroundColor: theme.colors.secondary,
  padding: '1.5em',
  borderRadius: '0.75em',
  boxShadow: theme.colors.boxShadow,
}));

const SidebarSelector = () => (
  <Wrapper>
    <CamerasSelector />
    <MicrophonesSelector />
    <SpeakersSelector />
  </Wrapper>
);

export default SidebarSelector;
