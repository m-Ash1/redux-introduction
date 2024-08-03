import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ account }) {
  return <div className="balance">{formatCurrency(account.balance)}</div>;
}

//! old way to connect the store to the component
function mapStateToProps(store) {
  return { account: store.account };
}
export default connect(mapStateToProps)(BalanceDisplay);
