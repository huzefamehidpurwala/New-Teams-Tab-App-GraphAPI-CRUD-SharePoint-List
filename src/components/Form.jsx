import {
    Button,
    Dropdown,
    Field,
    Input,
    Option,
} from "@fluentui/react-components";
import { useState } from "react";
import { EditDate } from "./EditDate.tsx";
import { Checkmark24Regular } from "@fluentui/react-icons";

const Form = (props) => {
    // let fieldObj = {};
    // const [fieldObj, setFieldObj] = useState({});
    const joinDate =
        props.fieldObj.JoiningDate && new Date(props.fieldObj.JoiningDate);
    const [empName, setEmpName] = useState(props?.fieldObj?.Title);
    const [empSalary, setEmpSalary] = useState(props?.fieldObj?.Salary);
    const [department, setDepartment] = useState(props?.fieldObj?.Department);
    const [joiningDate, setJoiningDate] = useState(joinDate);
    const [isActive, setIsActive] = useState(
        props.fieldObj.isActive
            ? true
            : props.fieldObj.isActive !== null
            ? false
            : null
    );

    return (
        <div
            style={{
                width: "100%",
                border: "1px solid black",
            }}
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    props?.submitAct(props?.fieldObj?.id, {
                        Title: empName,
                        Salary: empSalary,
                        Department: department,
                        JoiningDate: joiningDate,
                        isActive: isActive,
                    });
                    // alert("hello");
                }}
            >
                <div
                    id="form"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            padding: "20px",
                        }}
                    >
                        {/* {console.log("in the ruturn finc ->", empName)} */}
                        <Field label={"Enter Name:"} required>
                            <Input
                                type="text"
                                // defaultValue={empName}
                                value={empName}
                                onChange={(e) => setEmpName(e.target.value)}
                            />
                        </Field>

                        <Field label={"Enter Salary:"}>
                            <Input
                                type="number"
                                value={empSalary}
                                onChange={(e) => setEmpSalary(e.target.value)}
                            />
                        </Field>

                        <Field label={"Select Department:"}>
                            <Dropdown
                                placeholder="Select..."
                                defaultValue={department}
                                onOptionSelect={(event, data) =>
                                    setDepartment(data.optionValue)
                                }
                            >
                                <Option value="Sharepoint">Sharepoint</Option>
                                <Option value="MS Teams">MS Teams</Option>
                                <Option value="OpenSource">OpenSource</Option>
                            </Dropdown>
                        </Field>

                        <Field label={"Select JoiningDate:"} required>
                            <EditDate
                                placeholder="Select a date..."
                                showMonthPickerAsOverlay={true}
                                highlightCurrentMonth={true}
                                maxDate={new Date()}
                                value={joiningDate}
                                formatDate={props?.ConvertDate}
                                onSelectDate={(date) => setJoiningDate(date)}
                            />
                        </Field>

                        <Field label={"Set Employee Status:"}>
                            <Dropdown
                                placeholder="Select..."
                                defaultValue={
                                    isActive ? "Yes" : isActive !== null && "No"
                                }
                                onOptionSelect={(event, data) =>
                                    setIsActive(data.optionValue)
                                }
                            >
                                <Option value={true}>Yes</Option>
                                <Option value={false}>No</Option>
                            </Dropdown>
                        </Field>
                    </div>
                    <div>
                        <Button type="submit" appearance="primary" icon={<Checkmark24Regular />}>
                            {props.btnMsg ? props.btnMsg : "Submit"}
                        </Button>
                        &nbsp;&nbsp;
                        <Button onClick={props?.cancel}>Cancel</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Form;
