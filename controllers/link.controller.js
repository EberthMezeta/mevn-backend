import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";

export const createLink = async (req, res) => {
  try {
    const { longLink } = req.body;
    const link = new Link({
      longLink,
      shortLink: nanoid(6),
      userId: req.userId,
    });

    const newLink = await link.save();
    return res.status(201).json(newLink);
  } catch (error) {
    console.log(error);
  }
};

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ userId: req.userId });

    return res.json(links);
  } catch (error) {
    console.log(error);
  }
};

export const getLink = async (req, res) => {
  try {
    const { shortLink } = req.params;
    const link = await Link.findOne({ shortLink });

    if (!link) return res.status(404).json({ error: "No existe el link" });

    return res.json({ longLink: link.longLink });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({ error: "error de servidor" });
  }
};

export const getLinkPriv = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await Link.findById(id);

    if (!link) {
      return res.status(404).json({ message: "Links not found" });
    }

    if (!link.userId.equals(req.userId)) {
      return res.status(401).json({ message: "Link not c" });
    }

    return res.json(link);
  } catch (error) {
    console.log(error);
  }
};

export const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { longLink } = req.body;

    const link = await Link.findById(id);

    if (!link) {
      return res.status(404).json({ message: "Links not found" });
    }

    if (!link.userId.equals(req.userId)) {
      return res.status(401).json({ message: "Link not c" });
    }

    link.longLink = longLink;

    const responseLink = await link.save();

    return res.json(responseLink);
  } catch (error) {
    console.log(error);
  }
};

export const deleteLink = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await Link.findById(id);

    if (!link) {
      return res.status(404).json({ message: "Links not found" });
    }

    if (!link.userId.equals(req.userId)) {
      return res.status(401).json({ message: "Link not c" });
    }

    const responseLink = await link.remove();

    return res.json(responseLink);
  } catch (error) {
    console.log(error);
  }
};
