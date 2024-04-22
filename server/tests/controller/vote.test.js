const supertest = require('supertest');
const mongoose = require("mongoose");
const Answer = require('../../models/answers');
const Vote = require('../../models/votes');

// Mock the models
jest.mock('../../models/votes');
jest.mock('../../models/answers');

let server;
describe('POST vote endpoints test', () => {
	beforeEach(() => {
		server = require("../../server");
	});

	afterEach(async () => {
		server.close();
		await mongoose.disconnect();
	});

	it('should handle voting', async () => {
		// Mock request body
		const reqBody = {
			userId: 'dummyUserId',
			answerId: 'dummyAnswerId',
			voteType: true
		};

		// Mock Vote.findOne
		Vote.findOne.mockResolvedValueOnce(null); // Simulate user not voted before

		Answer.findByIdAndUpdate = jest.fn().mockResolvedValueOnce();

		// Send request to the router
		const response = await supertest(server)
			.post('/vote/')
			.send(reqBody);

		// Assert response
		expect(response.status).toBe(201);
		expect(response.body).toEqual({ message: 'Vote recorded successfully' });

		// Verify Vote.findOne was called
		expect(Vote.findOne).toHaveBeenCalledWith({ user: 'dummyUserId', answer: 'dummyAnswerId' });
		// Verify Answer.findByIdAndUpdate was called
		expect(Answer.findByIdAndUpdate).toHaveBeenCalledWith('dummyAnswerId', {
			$push: { votes: undefined }
		});
	});

	it('should fetch current vote', async () => {
		// Mock request query
		const reqQuery = {
			answerId: 'dummyAnswerId'
		};

		// Mock Vote.find
		const dummyVotes = [
			{ voteType: true },
			{ voteType: false }
		];
		Vote.find.mockResolvedValueOnce(dummyVotes);

		// Send request to the router
		const response = await supertest(server)
			.get('/vote/current-vote')
			.query(reqQuery);

		// Assert response
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ currentVotes: 0 });

		// Verify Vote.find was called
		expect(Vote.find).toHaveBeenCalledWith({ answer: 'dummyAnswerId' });
	});
});
