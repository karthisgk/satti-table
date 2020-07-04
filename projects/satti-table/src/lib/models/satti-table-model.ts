export interface Pagination {
    action: string;
    disabled: boolean;
    active: boolean;
}

export interface Sort {
    columnId: string;
    value: number;
}

export interface MdtOption {
    showEntry?: number;
    start?: number;
    length?: number;
    total?: number;
    searchText?: string;
    columns?: MdtColumn[];
    data?: any[];
    sort?: Sort;
    idKey?: string;
    reload?: () => void;
}

export interface ActionButtons {
    type: string;
    className?: string;
    returnKey?: string;
    iconClassName?: string;
    btnText?: string;
}

export interface MdtColumn {
    _id: string;
    label: string;
    sort?: boolean;
    action?: ActionButtons[];
}

export interface ActionReturn {
    type: string;
    data: any;
}
