import httpStatusCode from "../utils/httpStatusCode.js";
import { getStateById, getStateHistory, saveStateToFile } from "../utils/fileUtils.js";

export async function getAllSnapshots(req, res) {
  try {
    const stateHistory = await getStateHistory();
    return res.status(httpStatusCode.OK).json(stateHistory);
  } catch (err) {
    console.error("상태를 읽어오지 못했습니다.", err);
    return res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ errorMessage: "Internal Server Error" });
  }
}

export async function getSnapshotById(req, res) {
  try {
    const { id } = req.params;
    const stateHistory = await getStateById(id);

    if (!stateHistory) {
      return res
        .status(httpStatusCode.NOT_FOUND)
        .json({ error: "해당 상태를 조회할 수 없습니다." });
    }

    return res.status(httpStatusCode.OK).json(stateHistory);
  } catch (err) {
    console.error("상태를 조회할 수 없습니다.", err);
    return res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ errorMessage: "Internal Server Error" });
  }
}

export async function postSnapshot(req, res) {
  try {
    const { timestamp, state, dom, styles } = req.body;

    if (!timestamp || !state) {
      return res.status(httpStatusCode.BAD_REQUEST).json({ errorMessage: "Bad Request" });
    }

    const updatedHistory = await saveStateToFile({ timestamp, state, dom, styles });

    if (!updatedHistory) {
      return res.status(httpStatusCode.NOT_FOUND).json({ errorMessage: "저장할 상태가 없습니다" });
    }

    return res
      .status(httpStatusCode.CREATED)
      .json({ message: "상태 저장이 완료되었습니다.", data: updatedHistory });
  } catch (err) {
    console.error("상태 저장 오류가 생겼습니다.", err);
    return res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ errorMessage: "Internal Server Error" });
  }
}
