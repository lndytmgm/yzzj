CREATE TABLE mgm.users
(
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username varchar(80) NOT NULL,
    password varchar(120) NOT NULL,
    house varchar(120) NOT NULL,
    phone varchar(120) NOT NULL,
    auth_status int(11) NOT NULL,
    regist_date timestamp DEFAULT CURRENT_TIMESTAMP,
    regist_pic varchar(120)
);
CREATE UNIQUE INDEX house ON mgm.users (house);
CREATE UNIQUE INDEX phone ON mgm.users (phone);
CREATE UNIQUE INDEX username ON mgm.users (username);
CREATE UNIQUE INDEX users_regist_pic_uindex ON mgm.users (regist_pic);
INSERT INTO mgm.users (username, password, house, phone, auth_status, regist_date, regist_pic) VALUES ('435345', '345345', '1#401', '345345', 0, '2017-10-12 18:02:15', null);
INSERT INTO mgm.users (username, password, house, phone, auth_status, regist_date, regist_pic) VALUES ('324234', '234234', '5#401', '234324', 0, '2017-10-12 18:04:29', null);