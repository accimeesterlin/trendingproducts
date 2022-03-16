import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@Graphql/mutations";
import * as queries from "@Graphql/queries";

export const listNrts = () => API.graphql(graphqlOperation(queries.listNrts));

export const createNrt = async (nrt) =>
  API.graphql(
    graphqlOperation(mutations.createNrt, {
      input: nrt,
    })
  );

export const batchAddNrts = async (nrts) =>
  API.graphql(
    graphqlOperation(mutations.batchAddNrts, {
      input: {
        nrts,
      },
    })
  );

export const deleteNrt = (nrtId) =>
  API.graphql(
    graphqlOperation(mutations.deleteNrt, {
      input: {
        nrtId,
      },
    })
  );

export const getNrt = (nrtId) =>
  API.graphql(
    graphqlOperation(queries.getNrt, {
      nrtId,
    })
  );

export const updateNrt = (nrt, nrtId) =>
  API.graphql(
    graphqlOperation(mutations.updateNrt, {
      input: {
        ...nrt,
        updatedByField: nrtId,
      },
    })
  );
