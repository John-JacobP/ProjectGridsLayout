import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from "@mui/material";
import "./VMs.css";

const VMs = () => {
    // Generate 30 lines of dummy data
    const generateDummyData = () => {
        const dummyData = [];
        for (let i = 1; i <= 30; i++) {
            dummyData.push({
                name: `VM${i}`,
                status: i % 2 === 0 ? "Running" : "Stopped",
                cpuUsage: `${Math.floor(Math.random() * 50) + 1}%`,
                memoryUsage: `${Math.floor(Math.random() * 50) + 1}%`,
            });
        }
        return dummyData;
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15; // Change this as needed
    const vmDetails = generateDummyData();

    const totalPages = Math.ceil(vmDetails.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = vmDetails.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className="FullPage">
            <div className="NavBar">
                <p>NavBar</p>
            </div>
            <div className="SideBar">
                <p>Sidebar</p>
            </div>
            <div className="body">
                <div className="insideBody">
                    <h4>VM Details</h4>
                    <TableContainer component={Paper} className="TableMainBody">
                        <Table className="TableBody">
                            <TableHead className="TableHeader">
                                <TableRow className="TableHeadDescr">
                                    <TableCell>VM Name</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>CPU Usage</TableCell>
                                    <TableCell>Memory Usage</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="TableDescr">
                                {currentItems.map((vm, index) => (
                                    <TableRow key={index} className="TableRow">
                                        <TableCell>{vm.name}</TableCell>
                                        <TableCell>{vm.status}</TableCell>
                                        <TableCell>{vm.cpuUsage}</TableCell>
                                        <TableCell>{vm.memoryUsage}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                        style={{ marginTop: "10px" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default VMs;
