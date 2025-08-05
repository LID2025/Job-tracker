# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid, datetime

app = Flask(__name__)
CORS(app)

jobs = []

@app.route('/api/jobs', methods=['GET', 'POST'])
def handle_jobs():
    if request.method == 'POST':
        data = request.json
        data['id'] = str(uuid.uuid4())
        data['created'] = datetime.datetime.utcnow().isoformat()
        jobs.append(data)
        return jsonify(data), 201
    return jsonify(jobs)

@app.route('/api/jobs/<job_id>', methods=['PUT', 'DELETE'])
def handle_job(job_id):
    global jobs
    job = next((j for j in jobs if j['id'] == job_id), None)
    if not job:
        return jsonify({'error': 'not found'}), 404
    if request.method == 'PUT':
        job.update(request.json)
        return jsonify(job)
    jobs = [j for j in jobs if j['id'] != job_id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)