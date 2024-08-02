export interface AgentRecord {
    id: string
    fullName: string
    dob: string
    ogrn: string
    inn: string
    regNum: string
    snils: string
    address: string
    resources: string
    members: string
    law: string
    dateIn: string
    datePubl: string
    dateOut: string
}

export interface OrgRecord {
    number: string
    fullName: string
    decisionInMinjust: string
    decisionInGenproc: string
    decisionOutMinjust: string
    decisionOutGenproc: string
    dateIn: string
    dateOut: string
}