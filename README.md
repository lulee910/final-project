Management System of Pharmacy Store

First execute "npm install" to download the system dependent package
Then execute "npm start" to run the system.
Finally execute "npm seed" to import test data into the system

Login account: Phil  password: 123456

The main functions and operation procedures of the system are as follows:
1. doctor data maintenance
After logging in to the system, the first step is to add the doctor information, add the doctor information in [System Settings-->Doctor Info], and the doctor information will be displayed on the charging page after the doctor adds it.
2. drug data
The system must be charged after adding the drug, and the drug information is added in [Drug Management-->Drug Info].
When a drug is added, the name of the drug cannot be repeated.
The drug data can be imported in the form of excel. In the import interface, the excle template is first downloaded, and then the data maintenance is performed in the template. After the maintenance is completed, the data can be imported.
You can export the queried drug to excel, excel will be saved in the export folder in the program directory.
3. drug charges
Drug charges include two aspects: over-the-counter and prescription charges.
Prescription fee: The doctor's information must be selected for the prescription fee. All the information marked with red in the Basic Information column is required. The drug information can be entered in the Drug Info input boxes. The system will return the fuzzy query according to the input information. Corresponding drug information, then select the drug that needs to be charged, and at the same time, the amount of the drug input can be charged.
Over-the-counter charges: the operation method is the same as the prescription fee, but there is no need to select doctor information.
4. charge inquiry
The drug that has been charged can be inquired according to the search conditions, and the drug information that is inquired can be repeatedly charged, modified, and deleted. Repeated charges mean that the same drug for the same patient is charged again.
5. Financial management
Daily sales:
In the [Finance Management-->Daily Business Statement], you can query the total daily sales by time period.
Performance inquiry:
In the [Finance Management-->Performance Summary Statement], you can query the sales performance of each doctor after grouping by doctor.
6. user management
The user who registers on the login page is the administrator account. Only the administrator has the user management authority. The users added by the administrator in the user management are ordinary users, and the information can be modified for the ordinary user. The administrator account information is not displayed in the user interface. The administrator account can only change the password and cannot modify the login name.

Remarks:
This system is a multi-user system. When registering in the registration page, the system is opened with an independent charging system. Each registered user has its own independent data, and each registered user can only see the data in his own system.