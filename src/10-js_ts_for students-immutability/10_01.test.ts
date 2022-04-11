import {
	addNewBooksToUser,
	addNewCompanies, companiesAssociativeArrayType,
	removeBook,
	updateBook,
	updateCompanyName, updateCompanyNameAssociativeArray,
	UserType,
	UserWithCompaniesType
} from "./10_01";

test(`add new books to user`, () => {
	let user: UserType = {
		name: `Dima`,
		age: 42,
		address: {
			city: `Minsk`,
			street: `Denisovskaja`
		},
		laptop: {
			title: `Macbook`
		},
		books: [`css`, `html`, `js`, `react`]
	}

	const userCopy = addNewBooksToUser(user, [`ts`, `rest api`])
	console.log(userCopy)

	expect(user).not.toBe(userCopy)
	expect(user.laptop).toBe(userCopy.laptop)
	expect(user.address).toBe(userCopy.address)
	expect(user.books).not.toBe(userCopy.books)
	expect(userCopy.books[4]).toBe(`ts`)
	expect(userCopy.books[5]).toBe(`rest api`)
})

test(`update js to ts book to user`, () => {
	let user: UserType = {
		name: `Dima`,
		age: 42,
		address: {
			city: `Minsk`,
			street: `Denisovskaja`
		},
		laptop: {
			title: `Macbook`
		},
		books: [`css`, `html`, `js`, `react`]
	}

	const userCopy = updateBook(user, `js`, `ts`)
	console.log(userCopy)

	expect(user).not.toBe(userCopy)
	expect(user.laptop).toBe(userCopy.laptop)
	expect(user.address).toBe(userCopy.address)
	expect(user.books).not.toBe(userCopy.books)
	expect(user.books[2]).toBe(`js`)
	expect(userCopy.books[2]).toBe(`ts`)
})

test(`remove js book from user`, () => {
	let user: UserType = {
		name: `Dima`,
		age: 42,
		address: {
			city: `Minsk`,
			street: `Denisovskaja`
		},
		laptop: {
			title: `Macbook`
		},
		books: [`css`, `html`, `js`, `react`]
	}

	const userCopy = removeBook(user, `js`)
	console.log(userCopy)

	expect(user).not.toBe(userCopy)
	expect(user.laptop).toBe(userCopy.laptop)
	expect(user.address).toBe(userCopy.address)
	expect(user.books).not.toBe(userCopy.books)
	expect(user.books[2]).toBe(`js`)
	expect(userCopy.books[2]).toBe(`react`)
})

test(`add new companies for user`, () => {
	let user: UserType & UserWithCompaniesType = {
		name: `Dima`,
		age: 42,
		address: {
			city: `Minsk`,
			street: `Denisovskaja`
		},
		laptop: {
			title: `Macbook`
		},
		books: [`css`, `html`, `js`, `react`],
		companies: [
			{id: 1, title: `EPAM`},
			{id: 2, title: `WarGaming`}
		]
	}

	const userCopy = addNewCompanies(user, `google`)
	console.log(userCopy)

	expect(user).not.toBe(userCopy)
	expect(user.laptop).toBe(userCopy.laptop)
	expect(user.address).toBe(userCopy.address)
	expect(user.books).toBe(userCopy.books)
	expect(user.companies[2]).not.toBeDefined()
	expect(userCopy.companies[2].title).toBe(`google`)
})


test(`update company name for user`, () => {
	let user: UserType & UserWithCompaniesType = {
		name: `Dima`,
		age: 42,
		address: {
			city: `Minsk`,
			street: `Denisovskaja`
		},
		laptop: {
			title: `Macbook`
		},
		books: [`css`, `html`, `js`, `react`],
		companies: [
			{id: 1, title: `EPAM`},
			{id: 2, title: `WarGaming`}
		]
	}

	const userCopy = updateCompanyName(user, 1, `ЕПАМ`)
	console.log(userCopy)

	expect(user).not.toBe(userCopy)
	expect(user.laptop).toBe(userCopy.laptop)
	expect(user.address).toBe(userCopy.address)
	expect(user.books).toBe(userCopy.books)
	expect(user.companies[0].title).toBe(`EPAM`)
	expect(userCopy.companies[0].title).toBe(`ЕПАМ`)
})


test(`update (associative array) company name for user`, () => {

	let companiesAssociativeArray: companiesAssociativeArrayType

	companiesAssociativeArray = {
		'Dima': [{id: 1, title: `EPAM`}, {id: 2, title: `WarGaming`}],
		'Artem': [{id: 2, title: `WarGaming`}]
	}



	const userCopy = updateCompanyNameAssociativeArray(companiesAssociativeArray,
		`Dima`,
		1,
		`IT-Incubator`)



	expect(userCopy[`Dima`]).not.toBe(companiesAssociativeArray[`Dima`])
	expect(userCopy[`Artem`]).toBe(companiesAssociativeArray[`Artem`])
	expect(userCopy[`Dima`][0].title).toBe(`IT-Incubator`)
	expect(companiesAssociativeArray[`Dima`][0].title).toBe(`EPAM`)
	// console.log(userCopy)
	// console.log(companiesAssociativeArray)
})


// Глубокое копирование
test(`1. Simple object`, ()=>{
	let man = {
		name: 'John',
		age: 28
	};

	let manFullCopy = {...man}
	expect(manFullCopy.name).toBe(`John`)

	manFullCopy.name = `XXX`
	expect(manFullCopy.name).toBe(`XXX`)
	expect(man.name).toBe(`John`)

})

test(`2. Array of primitives`, ()=>{
	let numbers = [1, 2, 3];

	let numbersFullCopy:Array<number> = [...numbers]

	expect(numbersFullCopy[2]).toBe(3)

	numbersFullCopy[2] = 55
	console.log(numbers)
	console.log(numbersFullCopy)
	expect(numbersFullCopy[2]).toBe(55)
	expect(numbers[2]).toBe(3)

})

test(`3.Object inside an object`, ()=>{
	let man1 = {
		name: 'John',
		age: 28,
		mother: {
			name: 'Kate',
			age: 50
		}
	};

	let man1FullCopy = {...man1, mother: {...man1.mother}}

	expect(man1FullCopy.mother.name).toBe(`Kate`)

	man1FullCopy.mother.name = `Lola`
	console.log(man1)
	console.log(man1FullCopy)
	expect(man1FullCopy.mother.name).toBe(`Lola`)
	expect(man1.mother.name).toBe('Kate')

})

test(`4. Array of primitives inside an object`, ()=>{
	let man2 = {
		name: 'John',
		age: 28,
		friends: ["Peter", "Steven", "William"]
	};

	let man2FullCopy = {
		...man2, friends: man2.friends.map(el => el
		)
	}

	expect(man2FullCopy.friends[2]).toBe(`William`)

	man2FullCopy.friends[2] = `VALERA`
	console.log(man2)
	console.log(man2FullCopy)
	expect(man2FullCopy.friends[2]).toBe(`VALERA`)
	expect(man2.friends[2]).toBe('William')

})

test(`5. Array of objects`, ()=>{
	let people = [
		{name: "Peter", age: 30},
		{name: "Steven", age: 32},
		{name: "William", age: 28}
	];


	let peopleFullCopy = people.map(el => ({...el}))

	expect(peopleFullCopy[2].name).toBe(`William`)

	peopleFullCopy[2].name = `Sergei`
	console.log(people)
	console.log(peopleFullCopy)
	expect(peopleFullCopy[2].name).toBe(`Sergei`)
	expect(people[2].name).toBe('William')

})

test(`6. Array of objects inside object`, ()=>{
	let man3 = {
		name: 'John',
		age: 28,
		friends: [
			{name: "Peter", age: 30},
			{name: "Steven", age: 32},
			{name: "William", age: 28}
		]
	};

	let man3FullCopy = {...man3, friends: man3.friends.map(el => ({...el}))}//  your code - OK


	expect(man3FullCopy.friends[1].name).toBe(`Steven`)

	man3FullCopy.friends[1].name = `GEORGE`
	console.log(man3)
	console.log(man3FullCopy)
	expect(man3FullCopy.friends[1].name).toBe(`GEORGE`)
	expect(man3.friends[1].name).toBe('Steven')

})

test(`7. Object inside an object, inside an object`, ()=>{
	let man4 = {
		name: 'John',
		age: 28,
		mother: {
			name: "Kate",
			age: 50,
			work: {
				position: "doctor",
				experience: 15
			}
		}
	};

	let man4FullCopy = {...man4, mother: {...man4.mother, work: {...man4.mother.work}}}//  your code - OK



	expect(man4FullCopy.mother.work.position).toBe(`doctor`)

	man4FullCopy.mother.work.position = `DESIGNER`
	console.log(man4)
	console.log(man4FullCopy)
	expect(man4FullCopy.mother.work.position).toBe(`DESIGNER`)
	expect(man4.mother.work.position).toBe('doctor')

})

test(`8. Array of objects inside object -> object`, ()=>{
	let man5 = {
		name: 'John',
		age: 28,
		mother: {
			name: "Kate",
			age: 50,
			work: {
				position: "doctor",
				experience: 15
			},
			parents: [
				{name: "Kevin", age: 80},
				{name: "Jennifer", age: 78},
			]
		}
	};

	let man5FullCopy = {
		...man5, mother: {
			...man5.mother,
			work: {...man5.mother.work},
			parents: man5.mother.parents.map(el => ({...el}))
		}
	}//  your code - OK



	expect(man5FullCopy.mother.parents[1].name).toBe(`Jennifer`)

	man5FullCopy.mother.parents[1].name = `ELZA`
	console.log(JSON.stringify(man5))
	console.log(JSON.stringify(man5FullCopy))
	expect(man5FullCopy.mother.parents[1].name).toBe(`ELZA`)
	expect(man5.mother.parents[1].name).toBe('Jennifer')

})

test(`9. Object inside an object -> array -> object ->  object`, ()=>{
	let man6 = {
		name: 'John',
		age: 28,
		mother: {
			name: "Kate",
			age: 50,
			work: {
				position: "doctor",
				experience: 15
			},
			parents: [
				{
					name: "Kevin",
					age: 80,
					favoriteDish: {
						title: "borscht"
					}
				},
				{
					name: "Jennifer",
					age: 78,
					favoriteDish: {
						title: "sushi"
					}
				},
			]
		}
	};

	let man6FullCopy = {
		...man6, mother: {
			...man6.mother, work: {...man6.mother.work},
			parents: man6.mother.parents.map(el => ({...el, favoriteDish: {...el.favoriteDish}}))
		}
	} //  your code - OK



	expect(man6FullCopy.mother.parents[1].favoriteDish.title).toBe(`sushi`)

	man6FullCopy.mother.parents[1].favoriteDish.title = 'Potatoes'
	console.log(JSON.stringify(man6))
	console.log(JSON.stringify(man6FullCopy))
	expect(man6FullCopy.mother.parents[1].favoriteDish.title).toBe(`Potatoes`)
	expect(man6.mother.parents[1].favoriteDish.title).toBe('sushi')

})

test(`10. Array of objects inside an object -> object -> array -> object ->  object`, ()=>{
	let man7 = {
		name: 'John',
		age: 28,
		mother: {
			name: "Kate",
			age: 50,
			work: {
				position: "doctor",
				experience: 15
			},
			parents: [
				{
					name: "Kevin",
					age: 80,
					favoriteDish: {
						title: "borscht",
						ingredients: [
							{title: "beet", amount: 3},
							{title: "potatoes", amount: 5},
							{title: "carrot", amount: 1},
						]
					}
				},
				{
					name: "Jennifer",
					age: 78,
					favoriteDish: {
						title: "sushi",
						ingredients: [
							{title: "fish", amount: 1},
							{title: "rise", amount: 0.5}
						]
					}
				},
			]
		}
	};

	let man7FullCopy = {
		...man7, mother: {
			...man7.mother,
			work: {...man7.mother.work},
			parents: man7.mother.parents.map(el => ({
				...el,
				favoriteDish: {
					...el.favoriteDish,
					ingredients: el.favoriteDish.ingredients.map(elInner => ({...elInner}))
				}
			}))
		}

	}



	expect(man7FullCopy.mother.parents[1].favoriteDish.ingredients[1].amount).toBe(0.5)

	man7FullCopy.mother.parents[1].favoriteDish.ingredients[1].amount = 111
	console.log(JSON.stringify(man7))
	console.log(JSON.stringify(man7FullCopy))
	expect(man7FullCopy.mother.parents[1].favoriteDish.ingredients[1].amount).toBe(111)
	expect(man7.mother.parents[1].favoriteDish.ingredients[1].amount).toBe(0.5)

})


test(`10.2 Array of objects inside an object -> object -> array -> object ->  object with JSON.parse(JSON.stringify)`, ()=>{
	let man7 = {
		name: 'John',
		age: 28,
		mother: {
			name: "Kate",
			age: 50,
			work: {
				position: "doctor",
				experience: 15
			},
			parents: [
				{
					name: "Kevin",
					age: 80,
					favoriteDish: {
						title: "borscht",
						ingredients: [
							{title: "beet", amount: 3},
							{title: "potatoes", amount: 5},
							{title: "carrot", amount: 1},
						]
					}
				},
				{
					name: "Jennifer",
					age: 78,
					favoriteDish: {
						title: "sushi",
						ingredients: [
							{title: "fish", amount: 1},
							{title: "rise", amount: 0.5}
						]
					}
				},
			]
		}
	};

	let man7FullCopy = JSON.parse(JSON.stringify(man7))


	expect(man7FullCopy.mother.parents[1].favoriteDish.ingredients[1].amount).toBe(0.5)

	man7FullCopy.mother.parents[1].favoriteDish.ingredients[1].amount = 111
	console.log(JSON.stringify(man7))
	console.log(JSON.stringify(man7FullCopy))
	expect(man7FullCopy.mother.parents[1].favoriteDish.ingredients[1].amount).toBe(111)
	expect(man7.mother.parents[1].favoriteDish.ingredients[1].amount).toBe(0.5)

})
