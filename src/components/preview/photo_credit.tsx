import ExternalLink from '#/components/common/external_link';
import MutedText from '#/components/common/muted_text';

const AUTHOR_URL =
  'https://unsplash.com/fr/@aldebarans?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash';
const PHOTO_URL =
  'https://unsplash.com/fr/photos/illustration-de-galaxie-violette-et-noire-uXchDIKs4qI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash';

const PhotoCredit = () => (
  <MutedText className="text-center">
    Photo by <ExternalLink href={AUTHOR_URL}>Aldebaran S</ExternalLink> on{' '}
    <ExternalLink href={PHOTO_URL}>Unsplash</ExternalLink>
  </MutedText>
);
export default PhotoCredit;
