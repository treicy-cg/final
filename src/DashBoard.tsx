import { useState, useEffect} from 'react'
import 'Mentor' from './api.ts'

const SIZE = 5;
interface Props{
    mentor: Mentor;
    detailed: boolean;

}

export function MentorProp({mentor, detailed=false} : Props) {
    const className = 'flex flex-col gap-1 rander border bg-while p-4';
    const content = (
        <>
            <h2 className='text-xl font-bold'>{mentor.name}</h2>
            <p>Especialidad: {mentor.specialty}</p>
            <p>Modalidad: {mentor.modality}</p>
            <p className={mentor.availableSlots > 0 ? 'text-green-700':'text-red-600'}>
                Cupos disponibles : {mentor.availableSlots}
            </p>

        </>
    );
}