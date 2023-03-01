import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { getDevices, getDevicesByKind } from "../lib/devices";
import { getPermissions } from "../lib/permission";

interface DeviceSelectorProps {
  label: string;
  deviceKind: MediaDeviceKind;
  permissionName?: string;
  currentValue: MediaDeviceInfo | undefined;
  setValue: (value: MediaDeviceInfo | undefined) => void;
}

export default function DeviceSelector({
  label,
  deviceKind,
  permissionName,
  currentValue,
  setValue,
}: DeviceSelectorProps) {
  const [permissionState, setPermissionState] = useState<
    PermissionStatus["state"] | undefined
  >(undefined);

  const [devices, setDevices] = useState<MediaDeviceInfo[] | undefined>(
    undefined
  );
  useEffect(() => {
    if (permissionState !== "granted") {
      return setDevices(undefined);
    }

    getDevices()
      .then((devices) => {
        setDevices(getDevicesByKind(deviceKind, devices));
        setValue(devices[0]);
      })
      .catch(console.error);
  }, [deviceKind, permissionState, setValue]);

  const init = useCallback(async () => {
    const query = await getPermissions(permissionName!.toLowerCase());

    const isAudioDevice = permissionName!.toLowerCase() === "microphone";

    setPermissionState(query.state);
    checkAudioPermission(query.state, isAudioDevice);

    query.addEventListener("change", ({ currentTarget }) => {
      const state = (currentTarget as any).state; // TODO: Fix any type

      setPermissionState(state);
      checkAudioPermission(state, isAudioDevice);
    });
  }, [permissionName]);

  useEffect(() => {
    init();
  }, [init]);

  const handleChangeDevice = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;
    const device = devices?.find((d) => d.deviceId === value);

    setValue(device);
  };

  return (
    <div className="field">
      <label htmlFor={`selector-${deviceKind}`}>{label}</label>
      <select
        value={currentValue?.deviceId}
        onChange={handleChangeDevice}
        name={`selector-${deviceKind}`}
        id={`selector-${deviceKind}`}
      >
        {devices &&
          devices.map((device, key) => (
            <option key={key} value={device.deviceId}>
              {device.label}
            </option>
          ))}
      </select>
      {permissionState && (
        <DisplayPermissionStatus
          state={permissionState}
          permissionName={permissionName}
        />
      )}
    </div>
  );
}

function DisplayPermissionStatus({
  state,
  permissionName,
}: {
  state: PermissionStatus["state"];
  permissionName: DeviceSelectorProps["permissionName"];
}) {
  return state === "prompt" ? (
    <p style={{ color: "#999" }}>Waiting for {permissionName} permission</p>
  ) : state === "granted" ? (
    <p style={{ color: "green" }}>Permission granted for {permissionName}!</p>
  ) : (
    <p style={{ color: "red" }}>
      Permission denied for {permissionName}, we're not able to access to your
      device... :sad:
    </p>
  );
}

async function testRequestDevice(isAudioDevice: boolean = true) {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: isAudioDevice,
    video: !isAudioDevice,
  });
  stream.getTracks().map((track) => track.stop());
}

async function checkAudioPermission(
  state: PermissionStatus["state"],
  isAudioDevice: boolean
) {
  if (state === "prompt") {
    testRequestDevice(isAudioDevice);
  }
}
