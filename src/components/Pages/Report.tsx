import {
    Box,
    Button,
    Input,
    Modal,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Artwork {
    artworkId: number;
    name: string;
    description: string;
    image: string;
    price: number;
    artistID: number;
    artist?: any;
    isPublic: boolean;
    isBuyAvailable: boolean;
    banStatus: number;
    banReason?: any;
    artworkRating: number;
    artworkDate: string;
    genreId: number;
    genre?: any;
}

interface Report {
    reportId: number;
    reportReason: string;
    resolveDescription: string;
    isResolved: boolean;
    artworkId: number;
    artwork?: Artwork | null;
    reporterId: number;
    reporter?: any;
}

export default function ReportPage() {
    const [listReport, setListReport] = useState<Report[]>([]);
    const fecthReport = async () => {
        const response = await fetch('http://localhost:5247/report');
        const data = await response.json();
        setListReport(data);
    };
    fecthReport();

    const updateReport = (report: Report) => {
        const newReport = listReport.map((r) =>
            r.reportId === report.reportId ? report : r
        );
        setListReport(newReport);
    };
    return (
        <>
            <h2>Report Page</h2>
            <div>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead
                            style={{
                                backgroundColor: 'lightgray',
                            }}
                        >
                            <TableRow>
                                <TableCell align="center">Report ID</TableCell>
                                <TableCell align="center">Artwork ID</TableCell>
                                <TableCell align="center">
                                    Report Reason
                                </TableCell>
                                <TableCell align="center">
                                    Is Resolved
                                </TableCell>
                                <TableCell align="center">
                                    Resolve Description
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listReport.map((row, _) => (
                                <TableRow
                                    key={row.reportId}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                    style={{
                                        backgroundColor:
                                            _ % 2 === 1 ? 'lightgray' : 'white',
                                    }}
                                >
                                    <TableCell align="center">
                                        {row.reportId}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.artwork &&
                                            ShowArtwork({
                                                artwork: row.artwork as Artwork,
                                            })}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.reportReason}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.isResolved ? 'Yes' : 'No'}
                                    </TableCell>
                                    <TableCell align="center">
                                        <ModalResolveTicket
                                            reportId={row.reportId}
                                            updateReport={updateReport}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}

const ShowArtwork = ({ artwork }: { artwork: Artwork }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '100px',
            }}
        >
            <h4>Name: {artwork.name}</h4>
            <img width={150} src={artwork.image} alt={artwork.name} />
            <p>Description: {artwork.description}</p>
        </div>
    );
};

const styleModal = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const ModalResolveTicket = ({
    reportId,
    updateReport,
}: {
    reportId: number;
    updateReport: (report: Report) => void;
}) => {
    const [open, setOpen] = useState(false);
    const [reportDescription, setReportDescription] = useState('');
    const [isBanArtwork, setIsBanArtwork] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleResolveTicket = async () => {
        await fetch('http://localhost:5247/report/' + reportId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reportId: reportId,
                resolveDescription: reportDescription,
                isBanArtwork: isBanArtwork,
                isResolved: true,
            }),
        })
            .then(async (res) => {
                if (res.status === 200) {
                    toast.success('Success resolve ticket!');
                    const data = await res.json();
                    updateReport(data as Report);
                    handleClose();
                } else {
                    toast.error('Failed resolve ticket, try again!');
                }
            })
            .catch(() => {
                toast.error('Failed resolve ticket, try again!');
            });
    };

    return (
        <div>
            <Button onClick={handleOpen}>Resolved</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <h4>Resolve Ticket</h4>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                        }}
                    >
                        <Input
                            type="text"
                            placeholder="Enter report description"
                            value={reportDescription}
                            onChange={(e) =>
                                setReportDescription(e.target.value)
                            }
                        />
                        <Select
                            native={true}
                            value={isBanArtwork}
                            onChange={() => setIsBanArtwork(!isBanArtwork)}
                        >
                            <option value={'false'}>Not Ban</option>
                            <option value={'true'}>Ban Artwork</option>
                        </Select>
                        <Button
                            color="warning"
                            onClick={async () => {
                                await handleResolveTicket();
                            }}
                        >
                            Resolve Ticket
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};
