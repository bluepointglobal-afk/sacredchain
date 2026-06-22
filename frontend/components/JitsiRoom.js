'use client';

import { JitsiMeeting } from '@jitsi/react-sdk';

const JITSI_DOMAIN = process.env.NEXT_PUBLIC_JITSI_DOMAIN || 'meet.jit.si';

export default function JitsiRoom({ room, displayName, onEnd }) {
  return (
    <JitsiMeeting
      domain={JITSI_DOMAIN}
      roomName={room}
      configOverwrite={{
        prejoinPageEnabled: false,
        disableModeratorIndicator: true,
        startScreenSharing: false,
        enableEmailInStats: false,
        // We provide our own chat panel via Socket.io.
        toolbarButtons: ['microphone', 'camera', 'desktop', 'fullscreen', 'hangup', 'tileview', 'settings'],
      }}
      interfaceConfigOverwrite={{
        SHOW_JITSI_WATERMARK: false,
        DEFAULT_BACKGROUND: '#0E1512',
      }}
      userInfo={{ displayName: displayName || 'Learner' }}
      onApiReady={(api) => {
        api.addEventListener('readyToClose', () => onEnd?.());
      }}
      getIFrameRef={(node) => {
        if (node) {
          node.style.height = '100%';
          node.style.width = '100%';
        }
      }}
    />
  );
}
