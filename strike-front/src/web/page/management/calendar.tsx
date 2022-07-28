import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import MessageService from "../../service/messageService";

type CalendarItemProp = {
  readonly year?: number;
  readonly month?: number;
  value?: string;
  valueFormat?: string;
};

type CalendarDateType = {
  target: dayjs.Dayjs;
  enable: boolean;
};

type CalendarWeekType = {
  week: CalendarDateType[];
};

export default function Calendar(props: CalendarItemProp) {
  const targetYear: number = props.year || dayjs().year();
  const targetMonth: number = props.month || dayjs().month() + 1;
  const startDay = dayjs(`${targetYear}-${targetMonth}-1`).startOf("month");
  const endDay = dayjs(`${targetYear}-${targetMonth}-1`).endOf("month");
  const format = props.valueFormat || "YYYY-MM-DD";

  function getRows(): CalendarWeekType[] {
    const rows: CalendarDateType[] = [];

    // 前月の最後の月曜～当月1日までを設定
    for (let i = 1; i <= startDay.day(); i++) {
      const current_date = startDay.subtract(i, "days");
      rows.push({ target: current_date, enable: false });
    }
    rows.sort((a, b) => (a > b ? 1 : -1));
    for (let i = startDay.date(); i <= endDay.date(); i++) {
      const current_date = dayjs(`${targetYear}-${targetMonth}-${i}`);
      rows.push({ target: current_date, enable: true });
    }

    // 来月の１日～来月最初の金曜までを設定
    const nextMonthRow: CalendarDateType[] = [];
    for (let i = endDay.day(); i < 7; i++) {
      const current_date = endDay.add(7 - i, "days");
      nextMonthRow.push({ target: current_date, enable: false });
    }
    nextMonthRow.sort((a, b) => (a > b ? 1 : -1));
    rows.push(...nextMonthRow);
    return [
      { week: rows.slice(0, 7) },
      { week: rows.slice(7, 14) },
      { week: rows.slice(14, 21) },
      { week: rows.slice(21, 28) },
      { week: rows.slice(28, 35) },
      { week: rows.slice(35, 42) },
    ];
  }
  const handleClickDate = (val: dayjs.Dayjs) => {
    props.value = val.format(format);
  };
  function getDateTable(week: CalendarDateType[]) {
    if (week.length !== 7) {
      return "";
    }
    return week.map((date) => {
      if (date.enable) {
        return (
          <TableCell component="th" scope="row" color="d">
            <Button onClick={() => handleClickDate(date.target)}>
              {date.target.format("D")}
            </Button>
          </TableCell>
        );
      }
      if (
        date.target.month() + 1 !== props.month &&
        (date.target.day() == 0 || date.target.date() === 1)
      ) {
        return (
          <TableCell component="th" scope="row" align="center">
            {date.target.format("M/D")}
          </TableCell>
        );
      }
      return (
        <TableCell component="th" scope="row" align="center">
          {date.target.format("D")}
        </TableCell>
      );
    });
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                {MessageService.Messages.week.sun}
              </TableCell>
              <TableCell align="center">
                {MessageService.Messages.week.mon}
              </TableCell>
              <TableCell align="center">
                {MessageService.Messages.week.tue}
              </TableCell>
              <TableCell align="center">
                {MessageService.Messages.week.wed}
              </TableCell>
              <TableCell align="center">
                {MessageService.Messages.week.thu}
              </TableCell>
              <TableCell align="center">
                {MessageService.Messages.week.fri}
              </TableCell>
              <TableCell align="center">
                {MessageService.Messages.week.sat}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getRows().map((row) =>
              row.week.length === 7 ? (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {getDateTable(row.week)}
                </TableRow>
              ) : (
                ""
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
