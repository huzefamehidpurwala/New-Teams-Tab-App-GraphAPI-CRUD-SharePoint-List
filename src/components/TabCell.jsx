import { TableCell } from "@fluentui/react-components";

const TabCell = (props) => {
    return props?.items?.map((cellItem, index) => {
        // console.log("cellItem in tabcell ==== ", cellItem);
        let check = cellItem && new Date(cellItem);
        return (
            <TableCell key={index}>
                {check?.toString() === "Invalid Date" || !isNaN(cellItem)
                    ? cellItem
                    : props.ConvertDate(cellItem)}
            </TableCell>
        );
    });
};

export default TabCell;
