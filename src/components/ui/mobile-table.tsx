import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Power, PowerOff } from "lucide-react"

interface MobileTableProps {
  filteredBooks: Array<any>
  handleEdit: (id: string) => void
  handleToggleStatus: (id: string) => void
  handleDelete: (id: string) => void
}

export function MobileTable({
  filteredBooks,
  handleEdit,
  handleToggleStatus,
  handleDelete
}: MobileTableProps) {
  return (
    <div className="flex sm:hidden rounded-md border shadow-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title / Author</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBooks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No books found
              </TableCell>
            </TableRow>
          ) : (
            filteredBooks.map((book) => (
              <TableRow
                key={book.id}
                className={!book.active ? "bg-muted/50" : ""}
              >
                <TableCell className="flex flex-col justify-end font-medium truncate max-w-[160px] min-[345px]:max-w-[200px] min-[505px]:max-w-[250px]">
                  <dl>
                    <dd className="truncate">{book.title}</dd>
                    <dd className="font-normal truncate">{book.author}</dd>
                  </dl>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex md:flex-row justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(book.id)}
                    >
                      <Edit className="" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleToggleStatus(book.id)}
                    >
                      {book.active ? (
                        <PowerOff className="h-4 w-4" />
                      ) : (
                        <Power className="h-4 w-4" />
                      )}
                    </Button>

                    <Button
                      variant="destructive"
                      disabled={book.active}
                      size="icon"
                      onClick={() => handleDelete(book.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
