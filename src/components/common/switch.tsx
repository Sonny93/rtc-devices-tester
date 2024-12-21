import { Switch as MantineSwitch, Text } from '@mantine/core';

interface SwitchProps {
  label: string;
  name: string;
  checked: boolean;
  size?: string;
  disabled?: boolean;
  mb?: string;

  onChange: (name: string, checked: boolean) => void;
}

export const Switch = ({
  label,
  name,
  checked,
  size = 'md',
  mb = undefined,
  disabled = false,
  onChange,
}: SwitchProps) => (
  <MantineSwitch
    label={<Text fw={500}>{label}</Text>}
    name={name}
    onChange={(event) => onChange(name, event.currentTarget.checked)}
    labelPosition="left"
    size={size}
    onLabel="ON"
    offLabel="OFF"
    checked={checked}
    disabled={disabled}
    mb={mb}
    styles={{ track: { cursor: 'pointer' } }}
  />
);
