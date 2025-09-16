import { Form } from '@/components/Form';
import { Table } from '@/components/Table';
import { AppProvider } from '@/contexts/AppContext';

export function Translate() {
  return (
    <AppProvider >
      <Form />
      <Table />
    </AppProvider>
  );
}
