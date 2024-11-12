const express = require("express")
const cors = require("cors")
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
const fs = require("node:fs")

const standards = [
	{
		id: "1",
		name: "ISO 9001",
		createDate: "2023-01-15",
	},
	{
		id: "2",
		name: "ISO 14001",
		createDate: "2022-08-22",
	},
	{
		id: "3",
		name: "ISO 27001",
		createDate: "2021-11-05",
	},
]

const history = [
	{
		create_at: "2024-11-05 14:15:00",
		key: "INS-1005",
		address: "202 Birch Lane, Lakeview, FL",
		name: "Charlie White",
		standard: "ISO 50001",
		note: "Passed with no remarks",
	},
	{
		create_at: "2024-11-03 10:00:00",
		key: "INS-1003",
		address: "789 Pine Road, Greenfield, TX",
		name: "Alice Johnson",
		standard: "ISO 27001",
		note: "Inspection completed successfully",
	},
	{
		create_at: "2024-11-02 09:45:00",
		key: "INS-1002",
		address: "456 Oak Avenue, Maple City, CA",
		name: "Jane Smith",
		standard: "ISO 14001",
		note: "Minor issues, requires follow-up",
	},
	{
		create_at: "2024-11-04 11:30:00",
		key: "INS-1004",
		address: "101 Maple Street, Rivertown, NY",
		name: "Bob Brown",
		standard: "ISO 45001",
		note: "Safety concerns, needs attention",
	},
	{
		create_at: "2024-11-01 08:30:00",
		key: "INS-1001",
		address: "123 Elm Street, Springfield, IL",
		name: "John Doe",
		standard: "ISO 9001",
		note: "First inspection, all clear",
	},
]

app.get("/history/:id", (req, res) => {
	console.log("Get By Id", req.params)
	fs.readFile("./data.json", "utf8", (err, data) => {
		if (err) {
			console.error("Error reading file:", err)
			res.status(500).send("Error reading file")
			return
		}
		const jsonData = JSON.parse(data)
		res.send(jsonData)
	})
})

app.get("/standard", (_, res) => {
	const formattedStandards = standards.map((standard) => ({
		value: standard.name,
		label: standard.name,
	}))
	res.json(formattedStandards)
})

app.get("/history", (req, res) => {
	const params = req.query

	console.log("Received Param:", params)
	history.sort((a, b) => a.key.localeCompare(b.key))
	res.json(history)
})

app.post("/history", (req, res) => {
	
	if (req.body.actionType === "EDIT") {
		console.log("Call edit service")
	} else {
		console.log("Call create service")
	}
	res.status(200).send({ message: "Got Payload", data: req.body })
})

app.delete("/history", (req, res) => {
	const { ids } = req.body

	for (let i = 0; i < ids.length; i++) {
		console.log("Find history by id: ", ids[i])
		console.log("Deleted history id:", ids[i])
	}
	res.status(200).send({ message: "Entries deleted successfully" })
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
