import Service from '../models/Service.js';
import Provider from '../models/Provider.js';
import Application from '../models/Application.js';
import { asyncHandler } from '../middleware/error.js';
import { scSteps } from '../seed/data.js';

export const listServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ from: 1 });
  res.json({ services, steps: scSteps });
});

export const getService = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });
  if (!service) return res.status(404).json({ error: 'Service not found' });
  const providers = await Provider.find().sort({ rating: -1 });
  res.json({ service, providers, steps: scSteps });
});

export const listProviders = asyncHandler(async (req, res) => {
  const providers = await Provider.find().sort({ rating: -1 });
  res.json({ providers });
});

// POST /api/sacredchain/briefs — post a brief (B2B lead)
export const postBrief = asyncHandler(async (req, res) => {
  const { serviceSlug, organisation, email, details } = req.body;
  if (!email) return res.status(400).json({ error: 'email is required' });
  const brief = await Application.create({
    kind: 'brief',
    serviceSlug,
    organisation,
    email,
    details,
  });
  res.status(201).json({ ok: true, brief });
});
