import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const InboxModule = buildModule('InboxModule', m => {
  const initialMessage = m.getParameter('initialMessage');
  const inbox = m.contract('Inbox', [initialMessage]);
  return { inbox };
});

export default InboxModule;
