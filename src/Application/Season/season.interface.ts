export interface SeasonBody {
    id?: number;
    name: string;
    startDate: Date; //vérifier si tous les ans la date est la même, dans ce cas garder juste mois et jour
    endDate: Date;
}
