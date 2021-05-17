export const getSpecialty = (specialty) => {
    switch (Number(specialty)) {
        case 0: return 'Терапевт'
        case 1: return 'Ортопед'
        case 2: return 'Хирург'
        case 3: return 'Имплантолог'
        case 4: return 'Ортодонт'
        case 5: return 'Пародонтолог'
        case 6: return 'Гигиенист'
    }
}
