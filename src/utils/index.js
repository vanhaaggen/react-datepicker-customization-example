import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const frontDateTimeFormat = "YYYY-MM-DDTHH:mm:ss";

const inputDateFormat = "YYYY-MM-DD";

export const formatDateTimeBackend = (dateTime) =>
  dayjs(dateTime).utc(true).format(frontDateTimeFormat);

export const formatDateInput = (dateTime) =>
  dayjs(dateTime).format(inputDateFormat);

export const getLegalAgeDate = () =>
  dayjs().subtract(18, "year").format("YYYY-MM-DD");
