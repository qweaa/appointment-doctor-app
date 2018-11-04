const name = '数据模型'
//医师
const doctors = [
    {
        id: '00001',
        NickName: '黄医师',
        realName: '黄德东',
        age: 28,
        gender: 1,                 //0：未知，1：男，2：女
        recommend: 1,           //1：推荐医师，0：非推荐医师
        avatarUrl: require('@/assets/images/user/1.jpg'),
        province: '',
        city: '',
        country: '',
        follow: 100,
        evaluate: 80,
        info: '黄医师简介',
    },{
        id: '00002',
        NickName: '钟德华医师',
        realName: '钟德华',
        age: 34,
        gender: 2,
        recommend: 1,
        avatarUrl: require('@/assets/images/user/2.jpg'),
        province: '',
        city: '',
        country: '',
        follow: 100,
        evaluate: 80,
        info: '钟德华医师简介',
    },{
        id: '00003',
        NickName: '钟医师',
        realName: '钟宇煌',
        age: 43,
        gender: 1,
        recommend: 0,
        avatarUrl: require('@/assets/images/user/3.jpg'),
        province: '',
        city: '',
        country: '',
        follow: 100,
        evaluate: 80,
        info: '钟宇煌医师简介',
    },{
        id: '00004',
        NickName: '程奕迅医师',
        realName: '程奕迅',
        age:31,
        gender: 1,
        recommend: 0,
        avatarUrl: require('@/assets/images/user/4.jpg'),
        province: '',
        city: '',
        country: '',
        follow: 100,
        evaluate: 80,
        info: '程奕迅医师简介',
    },{
        id: '00005',
        NickName: '高医师',
        realName: '高忠明',
        age: 28,
        gender: 2,
        recommend: 0,
        avatarUrl: require('@/assets/images/user/5.jpg'),
        province: '',
        city: '',
        country: '',
        follow: 100,
        evaluate: 80,
        info: '高医师师简介',
    },{
        id: '00006',
        NickName: '高德医师',
        realName: '高德',
        age: 34,
        gender: 2,
        recommend: 1,
        avatarUrl: require('@/assets/images/user/6.jpg'),
        province: '',
        city: '',
        country: '',
        follow: 100,
        evaluate: 80,
        info: '高德医师师简介',
    },{
        id: '00007',
        NickName: '刘医师',
        realName: '刘志成',
        age: 38,
        gender: 1,
        recommend: 0,
        avatarUrl: require('@/assets/images/user/7.jpg'),
        province: '',
        city: '',
        country: '',
        follow: 100,
        evaluate: 80,
        info: '刘医师简介',
    }
]

//用户
const student = [
    {
        id: '00001',
        studentID: '1440225120',
        password: '123456',
        realName: '卢新益',
        NickName: '益达',
        age: 28,
        gender: 1,                 //0：未知，1：男，2：女
        avatarUrl: require('@/assets/images/user/1.jpg'),
        province: '',
        city: '',
        country: '',
        info: '我是一条帅气的小肥龙',
    },
    {
        id: '00002',
        studentID: '1440225121',
        password: '123456',
        realName: '蓝晓强',
        NickName: '肥强',
        age: 28,
        gender: 2,                 //0：未知，1：男，2：女
        avatarUrl: require('@/assets/images/user/4.jpg'),
        province: '',
        city: '',
        country: '',
        info: '我是一条帅气的小肥强',
    },
]

//时间表
const time = [
    {
        id: 0,
        start_time: '08:00:00',
        end_time: '08:30:00',
        use: 1,
    },{
        id: 1,
        start_time: '08:30:00',
        end_time: '09:00:00',
        use: 1,
    },{
        id: 2,
        start_time: '09:00:00',
        end_time: '09:00:00',
        use: 1,
    },{
        id: 3,
        start_time: '09:30:00',
        end_time: '10:0:00',
        use: 1,
    },{
        id: 4,
        start_time: '16:30:00',
        end_time: '17:0:00',
        use: 1,
    },
]

//预约表
const book = [
    {
        id: 0,
        doctor_id: '00001',
        date: '2018/11/04',
        time_id: 0,
        can_book: 10,
        has_book: 0,
        price: '10.00',
    },{
        id: 1,
        doctor_id: '00001',
        date: '2018/11/04',
        time_id: 1,
        can_book: 10,
        has_book: 0,
        price: '10.00',
    },{
        id: 2,
        doctor_id: '00001',
        date: '2018/11/04',
        time_id: 2,
        can_book: 10,
        has_book: 0,
        price: '10.00',
    },{
        id: 3,
        doctor_id: '00001',
        date: '2018/11/04',
        time_id: 4,
        can_book: 10,
        has_book: 0,
        price: '10.00',
    },

]

export {
    name,
    doctors,
    student,
    time,
    book,
}