
import { createClient } from '@/utils/supabase/server';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function Instruments() {
  const supabase = await createClient();
  const { data: kanji, error } = await supabase.from('japanese_vocabulary').select();

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }

  if (!kanji || kanji.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Japanese Vocabulary</h1>
        <p>No data found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Japanese Vocabulary</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Number</TableHead>
            <TableHead>Kanji</TableHead>
            <TableHead>Reading</TableHead>
            <TableHead>Meaning</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kanji.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.kanji}</TableCell>
              <TableCell>{item.reading}</TableCell>
              <TableCell>{item.meaning.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}