import { useContext, useState, useEffect } from "react";
import { TeamsFxContext } from "./Context";
import {
    Button,
    Field,
    Input,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    Text,
} from "@fluentui/react-components";
import {
    Add24Regular,
    ArrowLeft32Filled,
    ArrowRight32Filled,
    Checkmark24Regular,
    Delete24Regular,
    Edit24Regular,
    PersonRegular,
} from "@fluentui/react-icons";
import Form from "./Form";
import TabCell from "./TabCell";
import { Create, Delete, Read, Update } from "./crud";

export default function Tab() {
    const { themeString } = useContext(TeamsFxContext);
    const [loading, setLoading] = useState(true);
    const [displayForm, setDisplayForm] = useState(false);
    const [fieldObj, setFieldObj] = useState({});
    const [passCreate, setPassCreate] = useState();
    const [searchKeyword, setSearchKeyword] = useState("");
    let checkForNoData = true;

    const [dataList, setDataList] = useState();

    function ConvertDate(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
    }

    const columns = [
        { columnKey: "name", label: "Name" },
        { columnKey: "salary", label: "Salary" },
        { columnKey: "department", label: "Department" },
        { columnKey: "joiningdate", label: "JoiningDate" },
        { columnKey: "isactive", label: "isActive" },
        { columnKey: "action", label: "Action" },
    ];

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [slicedDataList, setSlicedDataList] = useState([]);
    const [totalNumOfPages, setTotalNumOfPages] = useState(1);
    const Pagination = () => {
        const indexOfLastElem = currentPage * rowsPerPage;
        const indexOfFirstElem = indexOfLastElem - rowsPerPage;
        if (!searchKeyword) {
            setSlicedDataList(
                dataList?.value?.slice(indexOfFirstElem, indexOfLastElem)
            );
            setTotalNumOfPages(parseInt(dataList?.value?.length / rowsPerPage));
        } else {
            let arr = dataList?.value.filter((arrData) => {
                if (arrData?.fields?.Title) {
                    return arrData?.fields?.Title?.toLowerCase().includes(
                        searchKeyword?.toLowerCase()
                    );
                }
            });
            setSlicedDataList(arr?.slice(indexOfFirstElem, indexOfLastElem));
            setTotalNumOfPages(arr?.length / rowsPerPage);
        }

        setTimeout(() => {
            setLoading(false);
        }, 2000);
        // setLoading(false);
    };

    useEffect(() => {
        dataList && Pagination();
    }, [dataList, currentPage, rowsPerPage, searchKeyword]);

    useEffect(() => {
        setLoading(true);
        Read((response) => setDataList(response));
    }, []);

    const [id, setId] = useState("nulll");
    const SetFieldObj = () => {
        let check = true;
        dataList?.value?.forEach((data) => {
            // console.log("log in foreach", id);
            if (data?.id === id) {
                // console.log("log in foreach if", data);
                // alert(data?.fields?.Title);
                check = false;
                setFieldObj(data.fields);
            }
        });
        check && setFieldObj({});
        !isNaN(id) && setDisplayForm(true);
    };

    useEffect(() => {
        dataList && SetFieldObj();
    }, [id]);

    return (
        <div
            className={
                themeString === "default"
                    ? "light"
                    : themeString === "dark"
                    ? "dark"
                    : "contrast"
            }
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            {loading && (
                <div
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <Spinner
                        size="huge"
                        labelPosition="below"
                        label="Fetching Data from GraphAPI..."
                    />
                </div>
            )}

            {!loading && (
                <>
                    <div id="header">
                        <Text align="center" size={900}>
                            <p>
                                CRUD Operations on Sharepoint List using
                                GraphAPI
                            </p>
                        </Text>
                    </div>

                    <div
                        id="body-footer"
                        style={{
                            flexGrow: "2",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                        }}
                    >
                        <div id="body">
                            <Field
                                label={"SearchBox"}
                                style={{
                                    maxWidth: "fit-content",
                                    margin: "auto",
                                }}
                            >
                                <Input
                                    value={
                                        searchKeyword === null
                                            ? ""
                                            : searchKeyword
                                    }
                                    placeholder="Enter Employee Name..."
                                    size="large"
                                    onChange={(event) =>
                                        setSearchKeyword(event.target.value)
                                    }
                                    contentBefore={<PersonRegular />}
                                    contentAfter={
                                        <Button
                                            appearance="transparent"
                                            onClick={() => {
                                                setSearchKeyword(null);
                                            }}
                                            icon={<Delete24Regular />}
                                        />
                                    }
                                />
                            </Field>

                            <Table arial-label="Default table">
                                <TableHeader>
                                    <TableRow>
                                        {columns.map((column) => {
                                            return (
                                                <TableCell
                                                    key={column.columnKey}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {slicedDataList &&
                                        slicedDataList.map((data, index) => {
                                            checkForNoData = false;
                                            return (
                                                <>
                                                    <TableRow
                                                        key={data?.fields?.id}
                                                    >
                                                        <TabCell
                                                            items={[
                                                                data?.fields
                                                                    ?.Title,
                                                                data?.fields
                                                                    ?.Salary,
                                                                data?.fields
                                                                    ?.Department,
                                                                data?.fields
                                                                    ?.JoiningDate,
                                                                data?.fields
                                                                    ?.isActive && (
                                                                    <Checkmark24Regular />
                                                                ),
                                                            ]}
                                                            ConvertDate={
                                                                ConvertDate
                                                            }
                                                        />
                                                        <TableCell>
                                                            <div className="action-btn">
                                                                <Button
                                                                    icon={
                                                                        <Edit24Regular />
                                                                    }
                                                                    appearance="primary"
                                                                    onClick={() => {
                                                                        setId(
                                                                            data
                                                                                ?.fields
                                                                                ?.id
                                                                        );
                                                                        setPassCreate(
                                                                            false
                                                                        );
                                                                    }}
                                                                    // disabled={!setDisplayForm}
                                                                >
                                                                    Edit
                                                                </Button>
                                                                &nbsp;&nbsp;&nbsp;
                                                                <Button
                                                                    icon={
                                                                        <Delete24Regular />
                                                                    }
                                                                    appearance="default"
                                                                    onClick={() => {
                                                                        Delete(
                                                                            data
                                                                                ?.fields
                                                                                ?.id
                                                                        );
                                                                    }}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                </>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                            {checkForNoData && (
                                <Text size={700}>
                                    <p>No Data Found!</p>
                                </Text>
                            )}
                        </div>

                        <div id="footer">
                            <div>
                                <Button
                                    icon={<ArrowLeft32Filled />}
                                    appearance="transparent"
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                    }
                                    style={{
                                        visibility: currentPage < 2 && "hidden",
                                    }}
                                >
                                    Prev..
                                </Button>
                                &nbsp;
                                <Text size={600}>{currentPage}</Text>
                                &nbsp;
                                <Button
                                    icon={<ArrowRight32Filled />}
                                    appearance="transparent"
                                    iconPosition="after"
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                    }
                                    style={{
                                        visibility:
                                            currentPage > totalNumOfPages &&
                                            "hidden",
                                    }}
                                >
                                    Next..
                                </Button>
                            </div>

                            <div>
                                <Field
                                    label={"Enter Number of rows to display:"}
                                    style={{
                                        maxWidth: "fit-content",
                                        margin: "auto",
                                    }}
                                >
                                    <Input
                                        onKeyDown={(e) => {
                                            e.key === "Enter" &&
                                                e.target.value > 0 &&
                                                setRowsPerPage(e.target.value);
                                        }}
                                    />
                                </Field>
                            </div>
                        </div>
                        {!displayForm ? (
                            <div>
                                <Button
                                    appearance="primary"
                                    icon={<Add24Regular />}
                                    onClick={() => {
                                        setId("false");
                                        setPassCreate(true);
                                        setDisplayForm(true);
                                    }}
                                >
                                    Add Data
                                </Button>
                            </div>
                        ) : (
                            <Form
                                fieldObj={fieldObj}
                                submitAct={passCreate ? Create : Update}
                                btnMsg={
                                    passCreate
                                        ? "Create New Record"
                                        : "Update the Record"
                                }
                                cancel={() => {
                                    setId("null");
                                    setDisplayForm(false);
                                }}
                                ConvertDate={ConvertDate}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
