import prisma from "../db/prisma";


export const createReport = async (req: any, res: any) => {
    const { title, description, long, lat, event_time, media_url, is_anonymous , type } = req.body;
    if (!title || !description || !long || !lat || !event_time || !type) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if(!is_anonymous && !req.custom_session){
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const report = await prisma.report.create({
            data: {
                title,
                description,
                long,
                lat,
                event_time,
                media_url,
                is_anonymous,
                type,
                user_id: !is_anonymous ? req.custom_session["$id"] : null
            }
        });
        return res.status(201).json({ message: "Report created successfully", data: report });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const getReports = async (req: any, res: any) => {
    try {
        const reports = await prisma.report.findMany();
        return res.status(200).json({ message: "Reports fetched successfully", data: reports });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}


export const getReportsByUser = async (req: any, res: any) => {
    try {
        const reports = await prisma.report.findMany({
            where: {
                user_id: req.custom_session["$id"]
            }
        });
        return res.status(200).json({ message: "Reports fetched successfully", data: reports });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const getReportById = async (req: any, res: any) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }
    try {
        const report = await prisma.report.findUnique({
            where: {
                id: id
            }
        });
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        return res.status(200).json({ message: "Report fetched successfully", data: report });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const updateReport = async (req: any, res: any) => {
    const { id } = req.params;
    const { title, description, long, lat, event_time, media_url, is_anonymous, type } = req.body;
    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }
    try {
        const report = await prisma.report.update({
            where: {
                id: id,
                user_id: req.custom_session["$id"]
            },
            data: {
                title,
                description,
                long,
                lat,
                event_time,
                media_url,
                is_anonymous,
                type
            }
        });
        return res.status(200).json({ message: "Report updated successfully", data: report });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const deleteReport = async (req: any, res: any) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }
    try {
        const report = await prisma.report.delete({
            where: {
                id: id,
                user_id: req.custom_session["$id"]
            }
        });
        return res.status(200).json({ message: "Report deleted successfully", data: report });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}