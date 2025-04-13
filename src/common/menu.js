export default class menus {
    static mainMenu() {
        return [
            {
                pathName: '',
                name: 'home',
                title: 'TRANG CHỦ',
                isActive: false,
                childs: [],
                params: []
            },
            {
                pathName: 'menu',
                name: 'menu',
                title: 'MENU',
                isActive: false,
                childs: [
                    {
                        pathName: 'thuc-uong',
                        name: 'drinks',
                        title: 'THỨC UỐNG',
                        isActive: false,
                        params: [
                            { paramName: 'tra-sua', title: 'Trà sữa', categoryId: 'de312d08-97d7-42bc-b8db-560be34fe1f9' },
                            { paramName: 'tra-trai-cay', title: 'Trà trái cây' },
                            { paramName: 'ca-phe', title: 'Cà phê' }
                        ]
                    },
                    {
                        pathName: 'banh-ngot',
                        name: 'cakes',
                        title: 'BÁNH NGỌT',
                        isActive: false,
                        params: [
                            { paramName: 'banh-kem', title: 'Bánh kem' },
                            { paramName: 'banh-su', title: 'Bánh su' },
                        ]
                    }
                ],
                params: []
            },
            {
                pathName: 'san-pham-dong-goi',
                name: 'productsPackaged',
                title: 'SẢN PHẨM ĐÓNG GÓI',
                isActive: false,
                childs: [
                    {
                        pathName: 'ca-phe',
                        name: 'coffee',
                        title: 'CÀ PHÊ',
                        isActive: false,
                        params: [
                            { paramName: 'ca-phe-hat-khong-bo', title: 'Cà phê hạt không bơ' },
                        ]
                    },
                    {
                        pathName: 'tra',
                        name: 'tea',
                        title: 'TRÀ',
                        isActive: false,
                        params: [
                            { paramName: 'tra-hop-giay', title: 'Trà hộp giấy' },
                            { paramName: 'tra-cao-cap', title: 'Trà cao cấp' },
                        ]
                    }
                ],
                params: []
            },
            {
                pathName: 've-chung-toi',
                name: 'aboutUs',
                title: 'VỀ CHÚNG TÔI',
                isActive: false,
                childs: [
                    {
                        pathName: 'ca-phe',
                        name: 'coffee',
                        title: 'CÀ PHÊ',
                        isActive: false,
                        params: [
                            { paramName: 'tach-ca-phe', title: 'HÀNH TRÌNH TÁCH CÀ PHÊ' },
                            { paramName: 'nghe-thuat-pha-che', title: 'NGHỆ THUẬT PHA CHẾ' },
                        ]
                    },
                    {
                        pathName: 'tra',
                        name: 'tea',
                        title: 'TRÀ',
                        isActive: false,
                        params: [
                            { paramName: 'tach-tràtrà', title: 'HÀNH TRÌNH TÁCH TRÀ' },
                            { paramName: 'ppremiumTea', title: 'NGHỆ THUẬT PHA CHẾ' },
                        ]
                    }
                ],
                params: []
            },
            {
                pathName: 'khuyen-mai',
                name: 'bonus',
                title: 'KHUYẾN MÃI',
                isActive: false,
                childs: [],
                params: []
            },
            {
                pathName: 'hoi-vien',
                name: 'Member',
                title: 'HỘI VIÊN',
                isActive: false,
                childs: [],
                params: []
            },
        ]
    }
}