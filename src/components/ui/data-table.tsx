import { format } from "date-fns"
import { FilterOption } from "@/types"
import { useBookStore } from "@/store/bookStore"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Edit, Trash2, Power, PowerOff } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function DataTable() {
  const navigate = useNavigate()
  const {
    books,
    isLoading,
    error,
    filterOption,
    setFilterOption,
    toggleBookStatus,
    deleteBook
  } = useBookStore()

  const handleFilterChange = (value: string) => {
    setFilterOption(value as FilterOption)
  }

  const handleEdit = (id: string) => {
    console.log("Edit book with id:", id)
    navigate(`/edit/${id}`)
  }

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleBookStatus(id)
      toast.success("Book status updated successfully")
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id)
      toast.success("Book deleted successfully")
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const filteredBooks = books.filter((book) => {
    if (filterOption === "all") return true
    if (filterOption === "active") return book.active
    return !book.active
  })

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "--"
    return format(new Date(dateString), "dd MMMM yyyy, h:mm a")
  }

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading books...</div>
  }

  if (error) {
    return <div className="text-red-500 p-8">Error: {error}</div>
  }

  return (
    <div className="px-2 lg:px-1 space-y-4">
      <div className="flex flex-col gap-y-2 md:flex-row md:gap-4 justify-between items-center">
        <h2 className="text-2xl font-bold">Book List</h2>
        <div className="w-full md:w-[295px] flex flex-col md:flex-row items-center gap-4">

          <Select value={filterOption} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[97%] md:w-[180px]">
              <SelectValue placeholder="Filter books" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Show All</SelectItem>
              <SelectItem value="active">Show Active</SelectItem>
              <SelectItem value="deactivated">Show Deactivated</SelectItem>
            </SelectContent>
          </Select>
          <Button className="w-[97%] md:w-24" onClick={() => navigate("/add")}>Add Book</Button>
        </div>
      </div>

      <div className="text-center md:text-left text-sm text-muted-foreground">
        Showing {filteredBooks.length} of {books.length} books
      </div>

      <div className="rounded-md border shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Modified At</TableHead>
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
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{formatDate(book.createdAt)}</TableCell>
                  <TableCell>{formatDate(book.modifiedAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
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
    </div>
  )
}
