import sequelize from './sequelize'

// Models
import Doctor from './doctor'
import Clinic from './clinic'
import Consultation from './consultation'
import Appointment from './appointment'
import Patient from './patient'

// Creating associations between models
Doctor.belongsToMany(Clinic, {
	through: Consultation,
	foreignKey: 'doctor_uuid',
	uniqueKey: undefined,
})

Clinic.belongsToMany(Doctor, {
	through: Consultation,
	foreignKey: 'clinic_uuid',
	uniqueKey: undefined,
})

Consultation.hasMany(Appointment, {
	foreignKey: 'consultation_uuid',
})

Appointment.belongsTo(Consultation, {
	foreignKey: 'consultation_uuid',
})

Patient.hasMany(Appointment, {
	foreignKey: 'patient_uuid',
})

Appointment.belongsTo(Patient, {
	foreignKey: 'patient_uuid',
})

export async function sync() {
	await sequelize.sync({ force: true })
}

export async function populate() {
	const img =
		'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='

	const doctor1 = await Doctor.create({
		email: 'prashant@gmail.com',
		password: 'prashant123',
		name: 'Prashant Jain',
		photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
		medical_certificate: img,
	})

	const doctor2 = await Doctor.create({
		email: 'pratik@gmail.com',
		password: 'pratik123',
		name: 'Pratik Babbar',
		photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
		medical_certificate: img,
	})

	const doctor3 = await Doctor.create({
		email: 'gaurang@gmail.com',
		password: 'gaurang123',
		name: 'Gaurang Gulati',
		photo: 'https://plus.unsplash.com/premium_photo-1661766569022-1b7f918ac3f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
		medical_certificate: img,
	})

	const patient1 = await Patient.create({
		email: 'gautam@gmail.com',
		password: 'gautam123',
		name: 'Gautam',
		phone: '123456789',
		gender: 'M',
		dob: '13/03/2002',
	})

	const patient2 = await Patient.create({
		email: 'aditya@gmail.com',
		password: 'aditya123',
		name: 'Aditya',
		phone: '123456789',
		gender: 'M',
		dob: '13/03/2002',
	})

	const clinic1 = await Clinic.create({
		name: 'Sant Muktabai Hospital',
		address:
			'3WX3+9MF, SG Barve Marg, near muktabai hospital, Siddharth Nagar, Barve Nagar, Ghatkopar West, Mumbai, Maharashtra 400084',
		lat: 19.09853306012679,
		long: 72.90421027992024,
	})

	const clinic2 = await Clinic.create({
		name: 'Vithoba Clinic',
		address:
			'Newdayasagar, Bhim Nagar, Panchashil Nagar, Ghatkopar West, Mumbai, Maharashtra 400084',
		lat: 19.096350580909256,
		long: 72.90523876965845,
	})

	await Promise.all([
		// Doctor 1 at Clinic 1
		Consultation.create({
			doctor_uuid: doctor1.getDataValue('uuid'),
			clinic_uuid: clinic1.getDataValue('uuid'),
			start_time: '18:00:00',
			end_time: '23:59:00',
		}),

		// Doctor 2 at Clinic 2
		Consultation.create({
			doctor_uuid: doctor2.getDataValue('uuid'),
			clinic_uuid: clinic2.getDataValue('uuid'),
			start_time: '20:00:00',
			end_time: '23:00:00',
		}),

		// Doctor 3 at Clinic 2
		Consultation.create({
			doctor_uuid: doctor3.getDataValue('uuid'),
			clinic_uuid: clinic2.getDataValue('uuid'),
			start_time: '15:00:00',
			end_time: '18:00:00',
		}),
	])
}
