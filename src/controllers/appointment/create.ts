import { type RequestHandler } from 'express'

// Models
import Appointment from '../../models/appointment'
import Consultation from '../../models/consultation'
import Clinic from '../../models/clinic'

export const controller: RequestHandler = async (req, res, next) => {
	try {
		const appointment = await Appointment.create(req.body)
		res.json(appointment)

		const consultation = await Consultation.findByPk(
			appointment.getDataValue('consultation_uuid')
		)

		const clinic = await Clinic.findByPk(
			consultation!.getDataValue('clinic_uuid')
		)

		const auth =
			'Basic ' +
			Buffer.from(
				'g9SjxqzQlATz2IZ1YpWGpw5KhY0' +
					':' +
					'DCdbPIpO7I2i8JnRNa1LMo49rI9LOeyIEY_96oXP6tvwHsP4JFVNvQ'
			).toString('base64')

		const payload = {
			device_id: appointment.getDataValue('hypertrack_device_id'),
			track_mode: 'on_time',
			orders: [
				{
					order_handle: appointment.getDataValue('uuid'),
					scheduled_at: '2023-05-29T23:50:00Z',
					destination: {
						geometry: {
							type: 'Point',
							coordinates: [
								clinic!.getDataValue('lat'),
								clinic!.getDataValue('long'),
							],
						},
						radius: 50,
					},
				},
			],
		}

		const payload2 = {
			ops_group_handle: appointment.getDataValue('uuid'),
			device_id: appointment.getDataValue('hypertrack_device_id'),
			orders: [
				{
					order_handle: appointment.getDataValue('uuid'),
					scheduled_at: '2023-05-29T23:50:00Z',
					destination: {
						geometry: {
							type: 'Point',
							coordinates: [
								clinic!.getDataValue('lat'),
								clinic!.getDataValue('long'),
							],
						},
						radius: 50,
					},
				},
			],
		}

		await fetch(
			`https://v3.api.hypertrack.com/devices/${appointment.getDataValue(
				'hypertrack_device_id'
			)}/start`,
			{
				method: 'POST',
				headers: {
					Authorization: auth,
				},
			}
		)

		await fetch(`https://v3.api.hypertrack.com/orders/estimate`, {
			method: 'POST',
			headers: {
				Authorization: auth,
			},
			body: JSON.stringify(payload),
		})

		await fetch('https://v3.api.hypertrack.com/orders/track', {
			method: 'POST',
			headers: {
				Authorization: auth,
			},
			body: JSON.stringify(payload),
		})

		// console.log('Tracking started successfully')
		// console.log(await response.json())
	} catch (e) {
		next(e)
	}
}
