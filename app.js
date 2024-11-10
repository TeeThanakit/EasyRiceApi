const express = require("express")
const cors = require("cors")
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

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

app.get("/history/:id", (req, res) => {
	console.log(req.params)
	res.send(req.params)
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
	const { id } = req.query

	console.log("Received Param:", params)
	if (id) {
		res.send(`Searching for ID: ${id}`)
	} else {
		res.send("No ID provided, showing all results.")
	}
})

app.post("/history", (req, res) => {
	console.log("Payload:", req.body)

	res.status(200).send({ message: "Got Payload", data: req.body })
})

app.delete("/history", (req, res) => {
	const { ids } = req.body

	for (let i = 0; i < ids.length; i++) {
		console.log("Delete Array", i)
	}
	res.status(200).send({ message: "Entries deleted successfully" })
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
