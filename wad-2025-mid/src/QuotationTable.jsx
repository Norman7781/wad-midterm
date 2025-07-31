import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { BsFillTrashFill } from "react-icons/bs";
import { MdClear } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";
import style from "./mystyle.module.css";

function QuotationTable({ data, deleteByIndex, clearAll }) {
  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Container>
        <h1>Quotation</h1>
        <p>
          <CiShoppingCart /> No items
        </p>
      </Container>
    );
  }

  const total = data.reduce((acc, v) => acc + v.qty * v.ppu, 0);
  const totalDiscount = data.reduce((acc, v) => acc + (v.discount || 0), 0);
  const discountedTotal = Math.max(total - totalDiscount, 0);

  return (
    <Container>
      <h1>Quotation</h1>
      <Button variant="outline-dark" onClick={clearAll}>
        <MdClear /> Clear
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={style.textCenter}>-</th>
            <th className={style.textCenter}>Qty</th>
            <th className={style.textCenter}>Item</th>
            <th className={style.textCenter}>Price/Unit</th>
            <th className={style.textCenter}>Discount</th>
            <th className={style.textCenter}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => {
            // If discount is greater than or equal to qty * ppu, amount is 0 and show "full discount"
            let rawAmount = v.qty * v.ppu - (v.discount || 0);
            let isFullDiscount = (v.discount || 0) >= v.qty * v.ppu;
            let amount = rawAmount < 0 ? 0 : rawAmount;
            return (
              <tr key={i}>
                <td className={style.textCenter}>
                  <BsFillTrashFill onClick={() => deleteByIndex(i)} />
                </td>
                <td className={style.textCenter}>{v.qty}</td>
                <td>{v.item}</td>
                <td className={style.textCenter}>{v.ppu}</td>
                <td className={style.textCenter}>{v.discount || 0}</td>
                <td className={style.textRight}>
                  {amount === 0 && isFullDiscount
                    ? "0 (full discount)"
                    : amount}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className={style.textRight}>
              Total
            </td>
            <td className={style.textRight}></td>
            <td className={style.textRight}>{total}</td>
          </tr>
          <tr>
            <td colSpan={4} className={style.textRight}>
              Total discount
            </td>
            <td className={style.textRight}>{totalDiscount}</td>
            <td className={style.textRight}></td>
          </tr>
          <tr>
            <td colSpan={4} className={style.textRight}>
              Amount
            </td>
            <td className={style.textRight}></td>
            <td className={style.textRight}>{discountedTotal}</td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}

export default QuotationTable;
