import { useState, useRef } from "react";
import {
  Container,
  Grid,
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);

  const addItem = () => {
    let item = products.find((v) => itemRef.current.value === v.code);

    const newItem = {
      item: item.name,
      ppu: Number(ppuRef.current.value),
      qty: Number(qtyRef.current.value),
      discount: Number(discountRef.current.value) || 0,
    };

    // Merge redundant items (same name and price)
    const idx = dataItems.findIndex(
      (v) => v.item === newItem.item && v.ppu === newItem.ppu
    );
    if (idx !== -1) {
      // Merge: sum qty and discount
      const merged = [...dataItems];
      merged[idx] = {
        ...merged[idx],
        qty: merged[idx].qty + newItem.qty,
        discount: merged[idx].discount + newItem.discount,
      };
      setDataItems(merged);
    } else {
      setDataItems([...dataItems, newItem]);
    }
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v.code);
    setPpu(item.price);
  };

  const clearAll = () => {
    setDataItems([]);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, backgroundColor: "#e4e4e4" }}>
            <Typography variant="h6" gutterBottom>
              Item
            </Typography>
            <TextField
              select
              fullWidth
              inputRef={itemRef}
              label="Select Product"
              defaultValue={products[0].code}
              onChange={productChange}
              margin="dense"
              size="small"
              sx={{ mb: 2 }}
            >
              {products.map((p) => (
                <MenuItem key={p.code} value={p.code}>
                  {p.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Price Per Unit"
              type="number"
              inputRef={ppuRef}
              value={ppu}
              onChange={() => setPpu(Number(ppuRef.current.value))}
              fullWidth
              margin="dense"
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Quantity"
              type="number"
              inputRef={qtyRef}
              defaultValue={1}
              fullWidth
              margin="dense"
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Discount"
              type="number"
              inputRef={discountRef}
              defaultValue={0}
              fullWidth
              margin="dense"
              size="small"
              inputProps={{ min: 0 }}
              placeholder="Discount for this row"
              sx={{ mb: 2 }}
            />
            <Divider sx={{ my: 2 }} />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={addItem}
            >
              Add
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearAll={clearAll}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
