// src/components/FilterForm.tsx
import { useState } from 'react'
import { type FormEvent } from 'react'

interface FilterFormProps {
	onFilter: (startDate: Date, endDate: Date) => Promise<void>
}

export default function FilterForm({ onFilter }: FilterFormProps) {
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const start = startDate ? new Date(startDate) : undefined
		const end = endDate ? new Date(endDate) : undefined

		try {
			await onFilter(start!, end!)
		} catch (error) {
			console.error('Failed to filter posts:', error)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Start Date:
				<input
					className='text-black'
					type='date'
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
				/>
			</label>
			<label>
				End Date:
				<input
					className='text-black'
					type='date'
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
				/>
			</label>
			<button type='submit'>Filter</button>
		</form>
	)
}
