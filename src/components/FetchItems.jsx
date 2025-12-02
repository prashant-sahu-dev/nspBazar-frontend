import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatusActions } from "../store/fetchStatusSlice";
import { itemsActions } from "../store/itemSlice";
import Loader from "./Loader";

const FetchStatus = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  let dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusActions.markFetchingStarted());
    fetch(`${import.meta.env.VITE_API_BASE_URL}/items`, { signal })
      .then((res) => res.json())
      .then((data) => {
        dispatch(fetchStatusActions.markFetchingFinished());
        dispatch(fetchStatusActions.markFetchDone());
        dispatch(itemsActions.addInitialItems(data.items));

      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted — safe to ignore");
        } else {
          console.error("Error fetching items:", err);
        }
      });

    return () => {
      controller.abort();
    };
  }, [fetchStatus.fetchDone]);
  return <></>;
};

export default FetchStatus;
