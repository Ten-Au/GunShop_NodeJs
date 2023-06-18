CREATE SCHEMA IF NOT EXISTS `tin-22850`;

CREATE TABLE IF NOT EXISTS `tin-22850`.`Customer` (
`_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
`firstName` VARCHAR(50) NOT NULL ,
`lastName` VARCHAR(50) NOT NULL ,
`nickName` VARCHAR(50) NULL,
`phoneNumber` VARCHAR(50) NOT NULL ,
`password` VARCHAR(100) NOT NULL,
PRIMARY KEY (`_id`) ,
UNIQUE INDEX `cus_id_UNIQUE` (`_id` ASC)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-22850`.`Gun_Seller` (
`_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
`gunNick` VARCHAR(50) NOT NULL ,
`experience` VARCHAR(50) NULL,
`salary` INT NOT NULL ,
PRIMARY KEY (`_id`) ,
UNIQUE INDEX `gun_id_UNIQUE` (`_id` ASC)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-22850`.`Appointment` (
`_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
`cus_id` INT UNSIGNED NOT NULL,
`gun_id` INT UNSIGNED NOT NULL,
`date` DATE NOT NULL ,
`location` VARCHAR(50) NOT NULL,
PRIMARY KEY (`_id`),
UNIQUE INDEX `appointment_id_UNIQUE` (`_id` ASC),
CONSTRAINT `cus_fk` FOREIGN KEY (`cus_id`) REFERENCES `Customer` (`_id`),
CONSTRAINT `gun_fk` FOREIGN KEY (`gun_id`) REFERENCES `Gun_Seller` (`_id`)
) ENGINE InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO `tin-22850`.`Customer` (`_id`, `firstName`, `lastName`, `nickName`, `phoneNumber`, `password`) VALUES
(1, 'Artem', 'Sydorovych', 'presidentMira', '797 979 779', '$2a$08$pGxUx3SW5aXgOiVjg4V7s.pHwjkdcEmb7nmij4FPHoQ63Q5xhCqvC'),
(2, 'Oleksandr', 'Podolich', 'Marquizy', '888 111 222', '$2a$08$K3CL2S2.Y.qmBogBWYLiOOoUPG2FwlM.VUAvdVVHnD8/hsq1bmd/G');

INSERT IGNORE INTO `tin-22850`.`Gun_Seller` (`_id`, `gunNick`, `experience`, `salary`) VALUES
(1, 'Leon Kennedy', 'Military Specialist', 50000),
(2, 'IDarius', 'Advanced', 20000);

INSERT IGNORE INTO `tin-22850`.`Appointment` (`_id`, `cus_id`, `gun_id`, `date`, `location`) VALUES
(1, 1, 1, '2022-12-23', 'Warszawa Centralna'),
(2, 2, 1, '2023-01-13', 'Warszawa Wschodnia'),
(3, 2, 2, '2022-11-30', 'Marszalkowska 32');

