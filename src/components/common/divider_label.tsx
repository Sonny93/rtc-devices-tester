const DIVIDER_LINE_CLASSES = 'flex-1 border-gray-200 dark:border-gray-700';

type DividerLabelProps = Readonly<{ label: string }>;

const DividerLabel = ({ label }: DividerLabelProps) => (
	<div className="flex w-full items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
		<hr className={DIVIDER_LINE_CLASSES} />
		<span>{label}</span>
		<hr className={DIVIDER_LINE_CLASSES} />
	</div>
);
export default DividerLabel;
