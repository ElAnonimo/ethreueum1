import path from 'path';
import { fileURLToPath } from 'url';
import { CompileFailedError, CompileResult, compileSol } from 'solc-typed-ast';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

let result: CompileResult;

try {
  result = await compileSol(inboxPath, 'auto');
} catch (e) {
  if (e instanceof CompileFailedError) {
    console.error('Compile errors encountered:');

    for (const failure of e.failures) {
      console.error(`SolcJS ${failure.compilerVersion}:`);

      for (const error of failure.errors) {
        console.error(error);
      }
    }
  } else {
    console.error(e.message);
  }
}

console.log('result.data.contracts[0].Inbox.evm.bytecode.object:', Object.values(result.data.contracts)[0].Inbox.evm.bytecode.object);
console.log('result.data.contracts[0].Inbox.abi:', Object.values(result.data.contracts)[0].Inbox.abi);
