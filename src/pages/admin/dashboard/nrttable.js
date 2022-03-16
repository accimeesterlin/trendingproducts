import React from "react";
import { Card, DataTable } from "@shopify/polaris";
import moment from "moment";
import numeral from "numeral";

export function NRTTable({ data = [] }) {
  if (!data.length) {
    return null;
  }
  const rows = data?.map((nrt) => {
    const { createdAt, nrtName, donationValue } = nrt;
    console.log("NrT: ", nrt);

    return [
      moment(createdAt).format("MMMM Do YYYY"),
      moment(createdAt).format("h:mm a"),
      nrtName,
      numeral(donationValue).format("$0,0.00"),
    ];
  });

  const total = data
    ?.map((nrt) => nrt.donationValue)
    .reduce((a, b) => a + b, 0);
  return (
    <Card>
      <DataTable
        columnContentTypes={["text", "numeric", "numeric", "numeric"]}
        headings={["Date", "Time", "Charity", "Amount"]}
        rows={rows}
        totals={["", "", "", numeral(total).format("$0,0.00")]}
      />
    </Card>
  );
}

export default NRTTable;
