/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import Legend from '~/components/common/legend';
import VideosSelector from '~/components/selectors/videos_selector';
import MicrophonesSelector from '~/components/selectors/microphones_selector';
import SpeakersSelector from '~/components/selectors/speakers_selector';
import useShouldCheckPermission from '~/hooks/use_should_check_permissions';

const Wrapper = styled.section(({ theme }) => ({
  height: '337.5px',
  backgroundColor: theme.colors.secondary,
  padding: '1.5em',
  borderRadius: '0.75em',
  boxShadow: theme.colors.boxShadow,
}));

export default function SidebarSelector() {
  const shouldCheckPermission = useShouldCheckPermission();
  return (
    <div>
      <Wrapper>
        <VideosSelector />
        <MicrophonesSelector />
        <SpeakersSelector />
      </Wrapper>
      {!shouldCheckPermission && (
        <Legend center css={{ marginTop: '2em' }}>
          When using 🦊 Firefox, devices and permissions are broken.
          <br />
          If you are experiencing a issue, try a Chromium-based browser.
        </Legend>
      )}
    </div>
  );
}
