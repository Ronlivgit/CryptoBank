declare interface HeaderBoxProps {
    type? : "title" | "greeting";
    title :string;
    subtext : string;
    user? : string;
}

declare interface BalanceBoxProps {
    accounts : Account[];
    totalBanks : number;
    currentBalance: number;
}

declare interface DoughnutChartProps {
    accounts: Account[];
}

declare interface SideBarProps {
    user : User
}

declare interface User {
    fullName:string;
    email:string;
    password:string;
    phoneNum:string;
    role:string;
    activeAccount:Account
    dateOfBirth:Date;
}

declare interface Account {
    ownerUserId:string;
    walletId:string;
    address:string;
}

declare interface Card {
    userId: string;
    limit: number;
    isBlocked:boolean;
    balance:number;
}

declare interface Transaction {
    txHash : string;
}

declare interface MobileNavProps {
    user : User
}

declare interface RightSideBarProps {
    user : User;
    transactions : Transaction[];
    cards : Card[]
}

declare interface CreditCardProps {
    card: Card;
    userName: string;
    showBalance?: boolean;
}
